# Boutique Stay Assistant Public Demo

This repository contains a clean-room TypeScript CLI that demonstrates a public-concept boutique hospitality assistant. It generates mocked stay plans from synthetic guest profiles, fictional property profiles, amenities, and local experiences.

The demo is intentionally small and deterministic so it can be reviewed, tested, and run without external services.

## Clean-Room Disclaimer

- This project is not affiliated with, endorsed by, or connected to any real hotel brand, booking platform, travel agency, or regulated travel service.
- It does not use proprietary source code, private data, brand assets, logos, trademarks, copied marketing language, or non-public product materials.
- All properties, guests, amenities, and local experiences are synthetic examples created for this repository.
- All integrations are mocked. The app does not call real third-party services, make bookings, process payments, or provide regulated travel advice.

## What It Demonstrates

- Synthetic guest preference matching for amenities and local experiences.
- Deterministic scoring based on travel-style tags, budget tier, property setting, and accessibility-oriented notes.
- Text and JSON outputs suitable for demos, tests, or downstream mock workflows.

## Requirements

- Node.js 22 or newer is recommended.
- npm 10 or newer is recommended.

## Setup

```bash
npm install
```

## Usage

Build the TypeScript source:

```bash
npm run build
```

List available synthetic inputs:

```bash
npm run start -- --list
```

Generate a text stay plan:

```bash
npm run start -- --guest luna --property harbor --days 2 --format text
```

Generate a JSON stay plan:

```bash
npm run start -- --guest avery --property market --days 1 --format json
```

## Validation

Run the test suite:

```bash
npm test
```

Run the full validation script, including a sample CLI execution:

```bash
npm run validate
```

## Data

Seed data lives in `src/data/syntheticStayData.ts` and includes:

- Three fictional properties.
- Three synthetic guest profiles.
- Ten fictional local experiences.
- A reusable clean-room disclaimer included in app output.

## Scope Limits

- No real availability, rates, reservations, loyalty accounts, maps, vendor listings, or concierge systems are connected.
- Recommendations are simple rule-based mock output, not machine-learning predictions.
- The CLI is a public-concept demonstration only and should not be used for live guest operations.
