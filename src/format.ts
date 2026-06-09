import type { StayPlan } from "./types";

export function formatPlanAsText(plan: StayPlan): string {
  const lines = [
    plan.disclaimer,
    "",
    `Stay plan for ${plan.guest.displayName}`,
    `${plan.property.name} (${plan.property.city})`,
    plan.property.summary,
    "",
    "Recommended amenities:"
  ];

  for (const amenity of plan.recommendedAmenities) {
    lines.push(`- ${amenity.item.name} [score ${amenity.score}]: ${amenity.reasons.join("; ")}`);
  }

  lines.push("", "Itinerary:");

  for (const day of plan.days) {
    lines.push(`Day ${day.day}:`);

    if (day.schedule.length === 0) {
      lines.push("- Flexible day: no strong synthetic matches were available.");
      continue;
    }

    for (const slot of day.schedule) {
      lines.push(
        `- ${slot.timeOfDay}: ${slot.experience.item.name} in ${slot.experience.item.neighborhood} [score ${slot.experience.score}]`
      );
      lines.push(`  ${slot.experience.item.description}`);
    }
  }

  lines.push("", "Concierge note:", plan.conciergeNote);

  return lines.join("\n");
}
