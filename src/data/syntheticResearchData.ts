import type { AnalystPersona, EvidenceSnippet, MockIntegration, ReviewTask, SyntheticCompany } from "../types";

export const cleanRoomDisclaimer =
  "Clean-room public demo using synthetic research data and local mock analysis only. Not investment advice, not a recommendation to buy or sell securities, and not connected to live market data, brokerage, portfolio management, underwriting, or money movement.";

export const analysts: AnalystPersona[] = [
  {
    id: "maya",
    name: "Maya Ortiz",
    role: "Generalist analyst",
    coverage: ["enterprise software", "financial infrastructure"],
    reviewFocus: ["growth", "margin", "valuation"]
  },
  {
    id: "dev",
    name: "Dev Shah",
    role: "Risk reviewer",
    coverage: ["governance", "platform risk", "market structure"],
    reviewFocus: ["risk", "governance", "valuation"]
  },
  {
    id: "nora",
    name: "Nora Lee",
    role: "Product specialist",
    coverage: ["developer tools", "workflow automation"],
    reviewFocus: ["product", "growth", "risk"]
  }
];

export const companies: SyntheticCompany[] = [
  {
    id: "aurora-ledger",
    name: "Aurora Ledger Systems",
    sector: "Financial workflow software",
    description: "Fictional issuer that sells reconciliation tooling to mid-market finance teams.",
    tags: ["growth", "margin", "product"]
  },
  {
    id: "northstar-grid",
    name: "Northstar Grid Analytics",
    sector: "Industrial analytics",
    description: "Fictional issuer that models maintenance needs for distributed energy equipment.",
    tags: ["growth", "risk", "valuation"]
  },
  {
    id: "civic-signal",
    name: "Civic Signal Networks",
    sector: "Communications infrastructure",
    description: "Fictional issuer operating compliance-oriented messaging software for public agencies.",
    tags: ["margin", "governance", "risk"]
  }
];

export const evidenceSnippets: EvidenceSnippet[] = [
  {
    id: "aurora-10k-synthetic",
    companyId: "aurora-ledger",
    kind: "filing",
    title: "Synthetic annual filing excerpt: customer concentration",
    sourceLabel: "Mock SEC filing cache",
    publishedOn: "2026-01-18",
    summary: "Top five customers represented 22% of fictional subscription revenue, down from 29% in the prior synthetic period.",
    signals: ["growth", "risk", "margin"],
    confidence: 0.88,
    citations: ["SYN-FILING-AUR-2026-01", "SYN-TABLE-CUST-04"]
  },
  {
    id: "aurora-product-note",
    companyId: "aurora-ledger",
    kind: "note",
    title: "Analyst note: reconciliation assistant pilot",
    sourceLabel: "Local notebook",
    publishedOn: "2026-02-03",
    summary: "Three synthetic finance teams reported faster exception triage after a mocked assistant rollout.",
    signals: ["product", "growth"],
    confidence: 0.72,
    citations: ["SYN-CALL-AUR-17"]
  },
  {
    id: "aurora-market-snapshot",
    companyId: "aurora-ledger",
    kind: "market",
    title: "Synthetic market snippet: valuation spread",
    sourceLabel: "Mock market data adapter",
    publishedOn: "2026-02-12",
    summary: "Fictional peer basket median multiple narrowed while Aurora's synthetic margin profile improved modestly.",
    signals: ["valuation", "margin"],
    confidence: 0.69,
    citations: ["SYN-MKT-AUR-09"]
  },
  {
    id: "northstar-news-contract",
    companyId: "northstar-grid",
    kind: "news",
    title: "Synthetic news: utility pilot expansion",
    sourceLabel: "Mock news wire",
    publishedOn: "2026-01-29",
    summary: "A fictional regional utility expanded a predictive maintenance pilot from 12 to 41 monitored sites.",
    signals: ["growth", "product"],
    confidence: 0.8,
    citations: ["SYN-NEWS-NSG-22"]
  },
  {
    id: "northstar-risk-brief",
    companyId: "northstar-grid",
    kind: "filing",
    title: "Synthetic filing excerpt: deployment dependency",
    sourceLabel: "Mock SEC filing cache",
    publishedOn: "2026-02-07",
    summary: "Implementation timelines depend on customer field sensor quality, creating fictional revenue-recognition variability.",
    signals: ["risk", "margin"],
    confidence: 0.91,
    citations: ["SYN-FILING-NSG-2026-02"]
  },
  {
    id: "northstar-valuation-note",
    companyId: "northstar-grid",
    kind: "market",
    title: "Synthetic market snippet: capex cycle sensitivity",
    sourceLabel: "Mock market data adapter",
    publishedOn: "2026-02-11",
    summary: "Synthetic sensitivity table shows a wide valuation range if utility maintenance budgets tighten.",
    signals: ["valuation", "risk"],
    confidence: 0.76,
    citations: ["SYN-MKT-NSG-11"]
  },
  {
    id: "civic-governance-note",
    companyId: "civic-signal",
    kind: "filing",
    title: "Synthetic governance excerpt: procurement reviews",
    sourceLabel: "Mock SEC filing cache",
    publishedOn: "2026-01-22",
    summary: "Fictional agency procurement reviews increased disclosure burden but improved renewal visibility.",
    signals: ["governance", "risk", "margin"],
    confidence: 0.86,
    citations: ["SYN-FILING-CSN-2026-01"]
  },
  {
    id: "civic-news-renewal",
    companyId: "civic-signal",
    kind: "news",
    title: "Synthetic news: multi-year renewal package",
    sourceLabel: "Mock news wire",
    publishedOn: "2026-02-08",
    summary: "A fictional public agency renewed communications workflow seats across seven departments.",
    signals: ["growth", "margin"],
    confidence: 0.74,
    citations: ["SYN-NEWS-CSN-31"]
  },
  {
    id: "civic-product-drift",
    companyId: "civic-signal",
    kind: "note",
    title: "Analyst note: feature parity concern",
    sourceLabel: "Local notebook",
    publishedOn: "2026-02-13",
    summary: "Synthetic interviews suggest slower feature parity versus modern collaboration tools.",
    signals: ["product", "risk"],
    confidence: 0.66,
    citations: ["SYN-CALL-CSN-08"]
  }
];

export const integrations: MockIntegration[] = [
  {
    id: "mock-filings",
    name: "Mock filings cache",
    category: "filings",
    status: "mocked",
    lastSync: "2026-02-14T09:30:00.000Z",
    description: "Local synthetic excerpts that resemble filing-derived research inputs without using real filings."
  },
  {
    id: "mock-news",
    name: "Mock news stream",
    category: "news",
    status: "mocked",
    lastSync: "2026-02-14T09:31:00.000Z",
    description: "Synthetic headlines and summaries for workflow demonstration only."
  },
  {
    id: "mock-market",
    name: "Mock market snapshot",
    category: "market",
    status: "mocked",
    lastSync: "2026-02-14T09:32:00.000Z",
    description: "Local valuation and market-context snippets without live prices or trading connectivity."
  },
  {
    id: "local-notebook",
    name: "Local analyst notebook",
    category: "notes",
    status: "available",
    lastSync: "2026-02-14T09:33:00.000Z",
    description: "Seeded notes that model analyst evidence capture and review."
  }
];

export const reviewTasks: ReviewTask[] = [
  {
    id: "task-citation-check",
    title: "Verify every thesis claim maps to synthetic citations",
    ownerId: "dev",
    status: "in_review",
    relatedEvidenceIds: ["aurora-10k-synthetic", "northstar-risk-brief", "civic-governance-note"],
    riskFlags: ["citation coverage", "source freshness"]
  },
  {
    id: "task-bear-case",
    title: "Stress-test bear case assumptions",
    ownerId: "maya",
    status: "todo",
    relatedEvidenceIds: ["northstar-valuation-note", "civic-product-drift"],
    riskFlags: ["downside scenario", "valuation sensitivity"]
  },
  {
    id: "task-product-read",
    title: "Review product adoption signals",
    ownerId: "nora",
    status: "approved",
    relatedEvidenceIds: ["aurora-product-note", "northstar-news-contract"],
    riskFlags: ["synthetic interview bias"]
  },
  {
    id: "task-integration-gap",
    title: "Confirm no live data integration is enabled",
    ownerId: "dev",
    status: "blocked",
    relatedEvidenceIds: [],
    riskFlags: ["demo boundary", "compliance review"]
  }
];
