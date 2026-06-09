import assert from "node:assert/strict";
import { buildStayPlan, listCatalog } from "../planner";

function runTests(): void {
  testCatalogListsSyntheticInputs();
  testWellnessGuestGetsAccessibleQuietRecommendations();
  testBudgetFilteringDeprioritizesPremiumScenario();
  testInvalidDaysAreRejected();
  console.log("All validation tests passed.");
}

function testCatalogListsSyntheticInputs(): void {
  const catalog = listCatalog();

  assert.equal(catalog.properties.length, 3);
  assert.equal(catalog.guests.length, 3);
  assert(catalog.properties.some((property) => property.id === "harbor"));
  assert(catalog.guests.some((guest) => guest.id === "luna"));
}

function testWellnessGuestGetsAccessibleQuietRecommendations(): void {
  const plan = buildStayPlan({ guestId: "luna", propertyId: "harbor", days: 2 });

  assert.equal(plan.property.id, "harbor");
  assert.equal(plan.guest.id, "luna");
  assert.equal(plan.recommendedAmenities[0]?.item.id, "stretch-deck");
  assert(plan.recommendedAmenities[0]?.reasons.includes("includes accessibility-oriented notes"));
  assert(plan.days[0]?.schedule.some((slot) => slot.experience.item.id === "harbor-tea-map"));
  assert(plan.disclaimer.includes("synthetic data"));
}

function testBudgetFilteringDeprioritizesPremiumScenario(): void {
  const plan = buildStayPlan({ guestId: "luna", propertyId: "market", days: 3 });
  const scheduledIds = plan.days.flatMap((day) => day.schedule.map((slot) => slot.experience.item.id));

  assert(!scheduledIds.includes("premium-chef-table"));
}

function testInvalidDaysAreRejected(): void {
  assert.throws(() => buildStayPlan({ guestId: "luna", propertyId: "harbor", days: 0 }), /Days must/);
  assert.throws(() => buildStayPlan({ guestId: "luna", propertyId: "harbor", days: 6 }), /Days must/);
}

runTests();
