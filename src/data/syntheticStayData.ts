import type { GuestProfile, LocalExperience, PropertyProfile } from "../types";

export const cleanRoomDisclaimer =
  "Clean-room public-concept demo using synthetic data and mocked recommendations only. Not affiliated with any real hotel brand, booking platform, or regulated travel service.";

export const properties: PropertyProfile[] = [
  {
    id: "harbor",
    name: "Harbor Lantern House",
    city: "Port Azure",
    summary: "A fictional waterfront boutique stay near galleries, walking paths, and quiet cafes.",
    vibeTags: ["culture", "food", "quiet", "wellness"],
    amenities: [
      {
        id: "stretch-deck",
        name: "Rooftop Stretch Deck",
        description: "A calm open-air space for guided mobility routines and morning breathing sessions.",
        tags: ["wellness", "quiet", "accessibility"],
        hours: "06:30-10:30"
      },
      {
        id: "pantry",
        name: "Neighborhood Pantry Shelf",
        description: "A rotating display of locally inspired snacks represented with synthetic inventory.",
        tags: ["food", "culture", "family"],
        hours: "07:00-21:00"
      },
      {
        id: "work-nook",
        name: "Window Work Nook",
        description: "A reservation-free quiet corner with power outlets and mock printing instructions.",
        tags: ["business", "quiet", "accessibility"],
        hours: "24 hours"
      }
    ]
  },
  {
    id: "canyon",
    name: "Canyon Atrium Inn",
    city: "Mesa Vale",
    summary: "A fictional desert-edge retreat designed around shaded courtyards and easy trail access.",
    vibeTags: ["outdoors", "wellness", "family", "quiet"],
    amenities: [
      {
        id: "gear-library",
        name: "Daypack Gear Library",
        description: "Mock inventory of walking poles, water flasks, and sun hats for low-risk excursions.",
        tags: ["outdoors", "family", "accessibility"],
        hours: "07:00-18:00"
      },
      {
        id: "cool-room",
        name: "Midday Cool Room",
        description: "A shaded lounge concept for quiet breaks during warm afternoon hours.",
        tags: ["wellness", "quiet", "family"],
        hours: "11:00-17:00"
      },
      {
        id: "focus-table",
        name: "Atrium Focus Table",
        description: "A small business-friendly table cluster away from high-traffic common areas.",
        tags: ["business", "quiet"],
        hours: "08:00-20:00"
      }
    ]
  },
  {
    id: "market",
    name: "Market Row Suites",
    city: "Northbridge",
    summary: "A fictional city-center stay close to public plazas, small theaters, and casual dining.",
    vibeTags: ["food", "culture", "business"],
    amenities: [
      {
        id: "sample-kitchen",
        name: "Demo Tasting Kitchen",
        description: "Synthetic tasting cards that explain local flavor profiles without real vendor claims.",
        tags: ["food", "culture"],
        hours: "16:00-19:00"
      },
      {
        id: "briefing-room",
        name: "Briefing Room",
        description: "A bookable mock meeting room with sample agendas and presentation checklists.",
        tags: ["business", "accessibility", "quiet"],
        hours: "07:00-22:00"
      },
      {
        id: "family-cart",
        name: "Family Comfort Cart",
        description: "A synthetic set of board games, night lights, and kid-safe route cards.",
        tags: ["family", "quiet"],
        hours: "08:00-21:00"
      }
    ]
  }
];

export const localExperiences: LocalExperience[] = [
  {
    id: "harbor-art-walk",
    name: "Pocket Gallery Walk",
    neighborhood: "Old Pier Loop",
    description: "A self-guided route through fictional micro-galleries and mural stops.",
    tags: ["culture", "quiet"],
    timeOfDay: ["morning", "afternoon"],
    durationMinutes: 75,
    priceTier: 1,
    accessibilityNotes: "Step-free route option included in the mock guide."
  },
  {
    id: "harbor-tea-map",
    name: "Calm Tea Counter Map",
    neighborhood: "Lantern Quay",
    description: "A short list of fictional tea counters suited to unhurried breaks.",
    tags: ["food", "quiet", "wellness"],
    timeOfDay: ["afternoon", "evening"],
    durationMinutes: 45,
    priceTier: 1,
    accessibilityNotes: "All stops are represented as ground-floor venues."
  },
  {
    id: "sunrise-boardwalk",
    name: "Sunrise Boardwalk Loop",
    neighborhood: "East Marina",
    description: "A fictional waterfront loop with benches and optional shorter turns.",
    tags: ["outdoors", "wellness", "accessibility"],
    timeOfDay: ["morning"],
    durationMinutes: 50,
    priceTier: 0,
    accessibilityNotes: "Flat route with rest points in the synthetic map."
  },
  {
    id: "mesa-shade-trail",
    name: "Shaded Mesa Trail Card",
    neighborhood: "North Wash",
    description: "A low-elevation fictional walking route emphasizing shade and water breaks.",
    tags: ["outdoors", "wellness", "family"],
    timeOfDay: ["morning"],
    durationMinutes: 90,
    priceTier: 0,
    accessibilityNotes: "Includes a shorter paved overlook option."
  },
  {
    id: "courtyard-story-hour",
    name: "Courtyard Story Hour",
    neighborhood: "Mesa Vale Commons",
    description: "A family-friendly fictional storytelling event with local history themes.",
    tags: ["family", "culture", "quiet"],
    timeOfDay: ["evening"],
    durationMinutes: 60,
    priceTier: 1,
    accessibilityNotes: "Seated format with space for mobility devices."
  },
  {
    id: "market-breakfast-lane",
    name: "Breakfast Lane Sampler",
    neighborhood: "Market Row",
    description: "A fictional casual food route built from synthetic cafe profiles.",
    tags: ["food", "culture"],
    timeOfDay: ["morning"],
    durationMinutes: 65,
    priceTier: 2
  },
  {
    id: "quiet-theater-matinee",
    name: "Small Theater Matinee",
    neighborhood: "Northbridge Arts Block",
    description: "A mocked matinee recommendation for guests who prefer seated cultural plans.",
    tags: ["culture", "quiet", "accessibility"],
    timeOfDay: ["afternoon"],
    durationMinutes: 120,
    priceTier: 2,
    accessibilityNotes: "Reserved aisle seating is represented in the synthetic notes."
  },
  {
    id: "business-coffee-route",
    name: "Laptop-Friendly Coffee Route",
    neighborhood: "Civic Steps",
    description: "A mocked list of quiet tables, outlets, and short walking transfers.",
    tags: ["business", "food", "quiet"],
    timeOfDay: ["morning", "afternoon"],
    durationMinutes: 80,
    priceTier: 1,
    accessibilityNotes: "Synthetic venues include wide-entry notes."
  },
  {
    id: "evening-food-plaza",
    name: "Evening Food Plaza",
    neighborhood: "Market Row",
    description: "A lively fictional dinner option for flexible travelers with higher noise tolerance.",
    tags: ["food", "culture", "family"],
    timeOfDay: ["evening"],
    durationMinutes: 95,
    priceTier: 2
  },
  {
    id: "premium-chef-table",
    name: "Premium Chef Table Scenario",
    neighborhood: "Civic Steps",
    description: "An intentionally synthetic high-cost option used to test budget filtering.",
    tags: ["food", "culture"],
    timeOfDay: ["evening"],
    durationMinutes: 150,
    priceTier: 3
  }
];

export const guests: GuestProfile[] = [
  {
    id: "luna",
    displayName: "Luna Rivera",
    preferences: ["wellness", "quiet", "food"],
    avoid: ["business"],
    budgetTier: 1,
    arrivalHour: 15,
    departureHour: 11,
    mobilitySupportRequested: true
  },
  {
    id: "avery",
    displayName: "Avery Chen",
    preferences: ["business", "food", "culture"],
    avoid: ["outdoors"],
    budgetTier: 2,
    arrivalHour: 12,
    departureHour: 16,
    mobilitySupportRequested: false
  },
  {
    id: "morgan-family",
    displayName: "Morgan Family",
    preferences: ["family", "outdoors", "culture"],
    avoid: ["business"],
    budgetTier: 1,
    arrivalHour: 14,
    departureHour: 10,
    mobilitySupportRequested: false
  }
];
