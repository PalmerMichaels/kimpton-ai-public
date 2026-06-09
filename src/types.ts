export type EvidenceKind = "filing" | "news" | "market" | "note";
export type EvidenceSignal = "growth" | "margin" | "risk" | "valuation" | "governance" | "product";
export type ReviewStatus = "todo" | "in_review" | "blocked" | "approved";
export type ThesisCase = "bull" | "base" | "bear";

export interface AnalystPersona {
  id: string;
  name: string;
  role: string;
  coverage: string[];
  reviewFocus: EvidenceSignal[];
}

export interface SyntheticCompany {
  id: string;
  name: string;
  sector: string;
  description: string;
  tags: EvidenceSignal[];
}

export interface EvidenceSnippet {
  id: string;
  companyId: string;
  kind: EvidenceKind;
  title: string;
  sourceLabel: string;
  publishedOn: string;
  summary: string;
  signals: EvidenceSignal[];
  confidence: number;
  citations: string[];
}

export interface MockIntegration {
  id: string;
  name: string;
  category: "filings" | "news" | "market" | "notes";
  status: "mocked" | "available" | "paused";
  lastSync: string;
  description: string;
}

export interface ReviewTask {
  id: string;
  title: string;
  ownerId: string;
  status: ReviewStatus;
  relatedEvidenceIds: string[];
  riskFlags: string[];
}

export interface ResearchProjectInput {
  analystId: string;
  companyId: string;
  objective: string;
  selectedSignals: EvidenceSignal[];
}

export interface RankedEvidence {
  evidence: EvidenceSnippet;
  score: number;
  reasons: string[];
}

export interface ThesisSection {
  case: ThesisCase;
  headline: string;
  narrative: string;
  supportingEvidenceIds: string[];
}

export interface SourceMemo {
  id: string;
  title: string;
  sourceEvidenceIds: string[];
  synthesis: string;
  unresolvedQuestions: string[];
}

export interface RiskAssumption {
  id: string;
  category: EvidenceSignal;
  statement: string;
  status: "untested" | "reviewing" | "supported" | "challenged";
  linkedEvidenceIds: string[];
}

export interface ResearchProject {
  id: string;
  disclaimer: string;
  enforcedLimitations: string[];
  analyst: AnalystPersona;
  company: SyntheticCompany;
  objective: string;
  selectedSignals: EvidenceSignal[];
  notebook: RankedEvidence[];
  sourceMemos: SourceMemo[];
  riskAssumptions: RiskAssumption[];
  theses: ThesisSection[];
  reviewTasks: ReviewTask[];
  integrations: MockIntegration[];
  statusSummary: Record<ReviewStatus, number>;
}

export interface WorkspaceCatalog {
  disclaimer: string;
  enforcedLimitations: string[];
  analysts: AnalystPersona[];
  companies: SyntheticCompany[];
  integrations: MockIntegration[];
}
