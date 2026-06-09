# Kimpton AI Public Clean-Room Demo

This repository contains an original TypeScript web app demonstrating a synthetic AI-native investment research workspace. It models onboarding, research project setup, an evidence notebook, synthetic filings/news/market snippets, thesis generation, analyst review tasks, mocked data integrations, tests, and documentation.

The app is deterministic and local-only. It is designed for clean-room demonstration of a public product concept, not for production financial workflows.

## Clean-Room Disclaimer

- This project is a public clean-room demo and is not affiliated with, endorsed by, or connected to any investment adviser, broker-dealer, exchange, data vendor, or issuer.
- It does not use proprietary source code, private data, paid research datasets, copied marketing language, brand assets, logos, or non-public materials.
- All companies, analysts, filings, news items, market snippets, citations, tasks, and integrations are synthetic seed data created for this repository.
- It does not provide investment advice, recommendations to buy or sell securities, underwriting, portfolio management, brokerage services, live market data, trade execution, payments, or money movement.
- Mocked integrations are local metadata only and do not call third-party APIs.

## Features

- Onboarding panel with a synthetic analyst persona and clean-room boundary copy.
- Research project setup for fictional companies and selected evidence signals.
- Evidence notebook with synthetic filing, news, market, and note snippets.
- Deterministic thesis generation for bull, base, and bear cases.
- Analyst review task/status board with risk flags and citation checks.
- Mock integration status cards for filings, news, market snapshots, and local notes.
- JSON API endpoints for catalog and project data.
- Validation tests for catalog setup, evidence ranking, thesis generation, task summaries, and disclaimers.

## Requirements

- Node.js 22 or newer is recommended.
- npm 10 or newer is recommended.

## Setup

```bash
npm install
```

## Run The Web App

Build the TypeScript source:

```bash
npm run build
```

Start the local web server:

```bash
npm start
```

Open `http://localhost:3000`.

You can adjust the default project with query parameters:

```text
http://localhost:3000/?analyst=dev&company=civic-signal&signals=risk,governance,valuation
```

## API Endpoints

- `GET /api/catalog` returns synthetic analysts, companies, mocked integrations, and the disclaimer.
- `GET /api/project` returns a generated research workspace project.
- `GET /api/project?analyst=nora&company=northstar-grid&signals=growth,product,risk` customizes the synthetic project.

## Validation

Run the test suite:

```bash
npm test
```

Run the full validation script, including a smoke output from the app entrypoint:

```bash
npm run validate
```

## Seed Data

Synthetic data lives in `src/data/syntheticResearchData.ts` and includes:

- Three fictional analyst personas.
- Three fictional companies.
- Nine synthetic evidence snippets spanning filings, news, market context, and local notes.
- Four mocked integration status records.
- Four analyst review tasks.

## Scope Limitations

- No live prices, filings, news, research feeds, financial statements, portfolios, brokerage accounts, trades, or payments are connected.
- Thesis generation is deterministic local string assembly over synthetic evidence, not a financial model or investment recommendation engine.
- Outputs are for demo and validation only and should not be used to make investment or trading decisions.
