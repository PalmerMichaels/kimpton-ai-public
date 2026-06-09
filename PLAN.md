# Clean-Room Implementation Plan

## Scope

Build an original TypeScript demonstration app for a boutique hospitality guest-assistance concept. The implementation will use only public, generic product ideas such as itinerary planning, amenity discovery, local recommendations, and mocked concierge-style responses.

## Clean-Room Boundaries

- Do not copy proprietary source code, private datasets, marketing copy, visual design, trademarks, logos, or assets.
- Do not call real third-party services or bypass access controls.
- Use only synthetic hotel, guest, amenity, and local attraction data.
- Use neutral project naming and original user-facing copy.
- Include clear disclaimers that the project is a public-concept demo and not affiliated with any real hotel brand or regulated travel service.

## Implementation Steps

1. Inspect the repository structure and choose the smallest runnable TypeScript setup.
2. Add seed data for synthetic properties, amenities, guest preferences, and local experiences.
3. Implement an original CLI or app that generates mocked stay plans, amenity matches, and concierge notes from the synthetic data.
4. Add validation tests or scripts covering core matching behavior and expected outputs.
5. Document setup, usage, clean-room limits, mocked integrations, and disclaimers in `README.md`.
6. Run validation locally, fix issues, then commit on `main`, push to `origin`, and verify a clean worktree with local `HEAD` equal to `origin/main`.
