import { cleanRoomDisclaimer, guests, localExperiences, properties } from "./data/syntheticStayData";
import type {
  Amenity,
  DayPlan,
  GuestProfile,
  LocalExperience,
  PropertyProfile,
  ScoredItem,
  StayPlan,
  TimeOfDay,
  TravelTag
} from "./types";

export interface BuildStayPlanOptions {
  guestId: string;
  propertyId: string;
  days: number;
}

export interface CatalogSummary {
  properties: Array<Pick<PropertyProfile, "id" | "name" | "city" | "summary">>;
  guests: Array<Pick<GuestProfile, "id" | "displayName" | "preferences" | "budgetTier">>;
}

const timeSlots: TimeOfDay[] = ["morning", "afternoon", "evening"];

export function listCatalog(): CatalogSummary {
  return {
    properties: properties.map(({ id, name, city, summary }) => ({ id, name, city, summary })),
    guests: guests.map(({ id, displayName, preferences, budgetTier }) => ({
      id,
      displayName,
      preferences,
      budgetTier
    }))
  };
}

export function buildStayPlan(options: BuildStayPlanOptions): StayPlan {
  const property = getProperty(options.propertyId);
  const guest = getGuest(options.guestId);
  const days = normalizeDays(options.days);

  const recommendedAmenities = property.amenities
    .map((amenity) => scoreAmenity(amenity, guest, property))
    .sort(sortByScoreThenName)
    .slice(0, 3);

  const dayPlans = buildDayPlans({ guest, property, days });

  return {
    generatedAt: new Date(0).toISOString(),
    disclaimer: cleanRoomDisclaimer,
    property,
    guest,
    recommendedAmenities,
    days: dayPlans,
    conciergeNote: buildConciergeNote(guest, property, recommendedAmenities, dayPlans)
  };
}

export function getProperty(id: string): PropertyProfile {
  const property = properties.find((candidate) => candidate.id === id);
  if (!property) {
    throw new Error(`Unknown property '${id}'. Run with --list to see available synthetic properties.`);
  }

  return property;
}

export function getGuest(id: string): GuestProfile {
  const guest = guests.find((candidate) => candidate.id === id);
  if (!guest) {
    throw new Error(`Unknown guest '${id}'. Run with --list to see available synthetic guests.`);
  }

  return guest;
}

function buildDayPlans(input: { guest: GuestProfile; property: PropertyProfile; days: number }): DayPlan[] {
  const scoredExperiences = localExperiences
    .map((experience) => scoreExperience(experience, input.guest, input.property))
    .filter((scored) => scored.score > 0)
    .sort(sortByScoreThenName);

  const usedExperienceIds = new Set<string>();
  const plans: DayPlan[] = [];

  for (let day = 1; day <= input.days; day += 1) {
    const schedule = timeSlots.flatMap((slot) => {
      const match = scoredExperiences.find(
        (scored) => scored.item.timeOfDay.includes(slot) && !usedExperienceIds.has(scored.item.id)
      );

      if (!match) {
        return [];
      }

      usedExperienceIds.add(match.item.id);
      return [{ timeOfDay: slot, experience: match }];
    });

    plans.push({ day, schedule });
  }

  return plans;
}

function scoreAmenity(
  amenity: Amenity,
  guest: GuestProfile,
  property: PropertyProfile
): ScoredItem<Amenity> {
  return scoreTaggedItem({
    item: amenity,
    itemName: amenity.name,
    tags: amenity.tags,
    guest,
    property,
    priceTier: 0,
    hasAccessibilityNotes: amenity.tags.includes("accessibility")
  });
}

function scoreExperience(
  experience: LocalExperience,
  guest: GuestProfile,
  property: PropertyProfile
): ScoredItem<LocalExperience> {
  return scoreTaggedItem({
    item: experience,
    itemName: experience.name,
    tags: experience.tags,
    guest,
    property,
    priceTier: experience.priceTier,
    hasAccessibilityNotes: Boolean(experience.accessibilityNotes)
  });
}

function scoreTaggedItem<T>(input: {
  item: T;
  itemName: string;
  tags: TravelTag[];
  guest: GuestProfile;
  property: PropertyProfile;
  priceTier: 0 | 1 | 2 | 3;
  hasAccessibilityNotes: boolean;
}): ScoredItem<T> {
  let score = 0;
  const reasons: string[] = [];

  for (const tag of input.tags) {
    if (input.guest.preferences.includes(tag)) {
      score += 4;
      reasons.push(`matches ${tag} preference`);
    }

    if (input.property.vibeTags.includes(tag)) {
      score += 1;
      reasons.push(`fits ${input.property.name} ${tag} setting`);
    }

    if (input.guest.avoid.includes(tag)) {
      score -= 5;
      reasons.push(`deprioritized because guest avoids ${tag}`);
    }
  }

  if (input.priceTier <= input.guest.budgetTier) {
    score += 2;
    reasons.push("fits guest budget tier");
  } else if (input.priceTier === input.guest.budgetTier + 1) {
    score -= 1;
    reasons.push("slightly above preferred budget tier");
  } else {
    score -= 6;
    reasons.push("well above preferred budget tier");
  }

  if (input.guest.mobilitySupportRequested) {
    if (input.hasAccessibilityNotes) {
      score += 3;
      reasons.push("includes accessibility-oriented notes");
    } else {
      score -= 2;
      reasons.push("missing accessibility-oriented notes");
    }
  }

  return {
    item: input.item,
    score,
    reasons: dedupe(reasons)
  };
}

function buildConciergeNote(
  guest: GuestProfile,
  property: PropertyProfile,
  amenities: Array<ScoredItem<Amenity>>,
  dayPlans: DayPlan[]
): string {
  const firstAmenity = amenities[0]?.item.name ?? "front-desk check-in";
  const firstExperience = dayPlans[0]?.schedule[0]?.experience.item.name ?? "a flexible neighborhood walk";

  return [
    `${guest.displayName} is matched with ${property.name} in ${property.city}.`,
    `Start with ${firstAmenity}, then consider ${firstExperience}.`,
    "All recommendations are generated from synthetic seed data and should be treated as mock planning output."
  ].join(" ");
}

function normalizeDays(days: number): number {
  if (!Number.isInteger(days) || days < 1 || days > 5) {
    throw new Error("Days must be an integer from 1 to 5 for this demo.");
  }

  return days;
}

function sortByScoreThenName<T extends { item: { name: string }; score: number }>(a: T, b: T): number {
  if (a.score !== b.score) {
    return b.score - a.score;
  }

  return a.item.name.localeCompare(b.item.name);
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)];
}
