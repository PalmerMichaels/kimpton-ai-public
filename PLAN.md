# Clean-Room Implementation Plan

## Target

Implement `kimpton-ai-public` as an original TypeScript web app demonstrating an AI-native investment research workspace inspired only by public product descriptions for Kimpton AI.

## Scope

The app will model a local, synthetic research workflow for analysts:

1. Onboarding that explains clean-room limits and selects a mock analyst persona.
2. Research project setup for fictional companies and themes.
3. Evidence notebook containing synthetic filings, news, market snippets, and analyst notes.
4. Source memo synthesis from seeded public-style notes and local citations.
5. Thesis generation workflow that turns selected synthetic evidence into draft bull/base/bear narratives.
6. Risk and assumption tracking with statuses and linked evidence.
7. Analyst review tasks with owners, statuses, risk flags, and approval state.
8. Mocked data integrations with local health/status metadata only.
9. Validation tests covering project setup, evidence scoring, source memos, risk assumptions, thesis generation, and review task status.

## Clean-Room Boundaries

- Do not copy proprietary source, private data, non-public datasets, visual design, logos, assets, trademarks, or marketing copy.
- Use synthetic issuers, synthetic filings, synthetic news, synthetic market snippets, and local mock analysis only.
- Do not connect to live market data, brokerages, paid research feeds, portfolio systems, or third-party APIs.
- Do not provide investment advice, trading recommendations, underwriting, portfolio management, brokerage, or money movement.
- Use neutral explanatory copy and clear non-advice disclaimers throughout the app and documentation.

## Implementation Steps

1. Inspect the repository and replace any prior non-target implementation.
2. Build a dependency-light TypeScript web server that serves a static HTML workspace and JSON API endpoints.
3. Add local seed data for fictional analysts, companies, evidence snippets, integrations, and review tasks.
4. Implement deterministic local logic for onboarding defaults, project assembly, evidence ranking, source memo synthesis, risk/assumption tracking, thesis drafting, and review summaries.
5. Add README instructions, clean-room disclaimers, and validation scripts.
6. Run validation locally, fix failures, commit on `main`, push to `origin`, and verify the worktree is clean with local `HEAD` equal to `origin/main`.
