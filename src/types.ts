export type TravelTag =
  | "accessibility"
  | "business"
  | "culture"
  | "family"
  | "food"
  | "outdoors"
  | "quiet"
  | "wellness";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export interface Amenity {
  id: string;
  name: string;
  description: string;
  tags: TravelTag[];
  hours: string;
}

export interface LocalExperience {
  id: string;
  name: string;
  neighborhood: string;
  description: string;
  tags: TravelTag[];
  timeOfDay: TimeOfDay[];
  durationMinutes: number;
  priceTier: 0 | 1 | 2 | 3;
  accessibilityNotes?: string;
}

export interface PropertyProfile {
  id: string;
  name: string;
  city: string;
  summary: string;
  vibeTags: TravelTag[];
  amenities: Amenity[];
}

export interface GuestProfile {
  id: string;
  displayName: string;
  preferences: TravelTag[];
  avoid: TravelTag[];
  budgetTier: 0 | 1 | 2 | 3;
  arrivalHour: number;
  departureHour: number;
  mobilitySupportRequested: boolean;
}

export interface ScoredItem<T> {
  item: T;
  score: number;
  reasons: string[];
}

export interface DayPlan {
  day: number;
  schedule: Array<{
    timeOfDay: TimeOfDay;
    experience: ScoredItem<LocalExperience>;
  }>;
}

export interface StayPlan {
  generatedAt: string;
  disclaimer: string;
  property: PropertyProfile;
  guest: GuestProfile;
  recommendedAmenities: Array<ScoredItem<Amenity>>;
  days: DayPlan[];
  conciergeNote: string;
}
