import {
  analysts,
  cleanRoomDisclaimer,
  companies,
  evidenceSnippets,
  integrations,
  reviewTasks
} from "./data/syntheticResearchData";
import type {
  AnalystPersona,
  EvidenceSignal,
  EvidenceSnippet,
  RankedEvidence,
  ResearchProject,
  ResearchProjectInput,
  RiskAssumption,
  ReviewStatus,
  ReviewTask,
  SourceMemo,
  SyntheticCompany,
  ThesisSection,
  WorkspaceCatalog
} from "./types";

export function getCatalog(): WorkspaceCatalog {
  return {
    disclaimer: cleanRoomDisclaimer,
    analysts,
    companies,
    integrations
  };
}

export function createResearchProject(input: ResearchProjectInput): ResearchProject {
  const analyst = findAnalyst(input.analystId);
  const company = findCompany(input.companyId);
  const selectedSignals = normalizeSignals(input.selectedSignals, company, analyst);
  const notebook = rankEvidence(company.id, selectedSignals, analyst.reviewFocus);
  const projectTasks = assembleReviewTasks(notebook);
  const sourceMemos = synthesizeSourceMemos(company, notebook);
  const riskAssumptions = trackRiskAssumptions(company, notebook, selectedSignals);

  return {
    id: `research-${company.id}-${analyst.id}`,
    disclaimer: cleanRoomDisclaimer,
    analyst,
    company,
    objective: input.objective.trim() || `Build a synthetic research brief for ${company.name}.`,
    selectedSignals,
    notebook,
    sourceMemos,
    riskAssumptions,
    theses: generateThesisSections(company, notebook),
    reviewTasks: projectTasks,
    integrations,
    statusSummary: summarizeTaskStatus(projectTasks)
  };
}

export function rankEvidence(
  companyId: string,
  selectedSignals: EvidenceSignal[],
  analystFocus: EvidenceSignal[]
): RankedEvidence[] {
  return evidenceSnippets
    .filter((snippet) => snippet.companyId === companyId)
    .map((snippet) => scoreEvidence(snippet, selectedSignals, analystFocus))
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      return a.evidence.publishedOn.localeCompare(b.evidence.publishedOn) * -1;
    });
}

export function generateThesisSections(company: SyntheticCompany, notebook: RankedEvidence[]): ThesisSection[] {
  const growthEvidence = topEvidenceFor(notebook, ["growth", "product", "margin"]);
  const riskEvidence = topEvidenceFor(notebook, ["risk", "governance", "valuation"]);
  const balancedEvidence = notebook.slice(0, 3);

  return [
    {
      case: "bull",
      headline: `${company.name} upside case: compounding operational proof points`,
      narrative: buildNarrative(company, growthEvidence, "could support a constructive synthetic thesis if follow-up review confirms durability"),
      supportingEvidenceIds: growthEvidence.map((item) => item.evidence.id)
    },
    {
      case: "base",
      headline: `${company.name} base case: evidence is promising but requires analyst review`,
      narrative: buildNarrative(company, balancedEvidence, "supports a measured watchlist view rather than an action recommendation"),
      supportingEvidenceIds: balancedEvidence.map((item) => item.evidence.id)
    },
    {
      case: "bear",
      headline: `${company.name} downside case: unresolved risk signals remain`,
      narrative: buildNarrative(company, riskEvidence, "highlights open questions that should be resolved before any real-world use"),
      supportingEvidenceIds: riskEvidence.map((item) => item.evidence.id)
    }
  ];
}

export function synthesizeSourceMemos(company: SyntheticCompany, notebook: RankedEvidence[]): SourceMemo[] {
  const groups = groupEvidenceByKind(notebook);

  return Object.entries(groups).map(([kind, items]) => ({
    id: `memo-${company.id}-${kind}`,
    title: `${company.name} ${kind} source memo`,
    sourceEvidenceIds: items.map((item) => item.evidence.id),
    synthesis: buildMemoSynthesis(kind, items),
    unresolvedQuestions: buildUnresolvedQuestions(items)
  }));
}

export function trackRiskAssumptions(
  company: SyntheticCompany,
  notebook: RankedEvidence[],
  selectedSignals: EvidenceSignal[]
): RiskAssumption[] {
  const riskEvidence = notebook.filter((item) => item.evidence.signals.includes("risk"));
  const valuationEvidence = notebook.filter((item) => item.evidence.signals.includes("valuation"));
  const productEvidence = notebook.filter((item) => item.evidence.signals.includes("product"));

  return [
    {
      id: `assumption-${company.id}-risk-controls`,
      category: "risk",
      statement: "Synthetic risk disclosures remain bounded by the evidence notebook and require reviewer confirmation.",
      status: riskEvidence.length > 0 ? "reviewing" : "untested",
      linkedEvidenceIds: riskEvidence.map((item) => item.evidence.id)
    },
    {
      id: `assumption-${company.id}-valuation-context`,
      category: "valuation",
      statement: "Synthetic valuation context is directional only and must not be interpreted as a price target or trading signal.",
      status: valuationEvidence.length > 0 && selectedSignals.includes("valuation") ? "supported" : "untested",
      linkedEvidenceIds: valuationEvidence.map((item) => item.evidence.id)
    },
    {
      id: `assumption-${company.id}-product-durability`,
      category: "product",
      statement: "Synthetic product adoption notes may overstate durability until citations are reviewed.",
      status: productEvidence.length > 0 ? "challenged" : "untested",
      linkedEvidenceIds: productEvidence.map((item) => item.evidence.id)
    }
  ];
}

export function summarizeTaskStatus(tasks: ReviewTask[]): Record<ReviewStatus, number> {
  return tasks.reduce<Record<ReviewStatus, number>>(
    (summary, task) => {
      summary[task.status] += 1;
      return summary;
    },
    { todo: 0, in_review: 0, blocked: 0, approved: 0 }
  );
}

function scoreEvidence(
  evidence: EvidenceSnippet,
  selectedSignals: EvidenceSignal[],
  analystFocus: EvidenceSignal[]
): RankedEvidence {
  let score = Math.round(evidence.confidence * 10);
  const reasons: string[] = [`confidence ${evidence.confidence.toFixed(2)}`];

  for (const signal of evidence.signals) {
    if (selectedSignals.includes(signal)) {
      score += 5;
      reasons.push(`matches project signal ${signal}`);
    }

    if (analystFocus.includes(signal)) {
      score += 3;
      reasons.push(`matches analyst focus ${signal}`);
    }
  }

  if (evidence.kind === "filing") {
    score += 2;
    reasons.push("filing-style evidence gets citation priority");
  }

  return { evidence, score, reasons: [...new Set(reasons)] };
}

function topEvidenceFor(notebook: RankedEvidence[], preferredSignals: EvidenceSignal[]): RankedEvidence[] {
  return notebook
    .filter((item) => item.evidence.signals.some((signal) => preferredSignals.includes(signal)))
    .slice(0, 2);
}

function buildNarrative(company: SyntheticCompany, evidence: RankedEvidence[], conclusion: string): string {
  const evidenceText = evidence
    .map((item) => `${item.evidence.title} (${item.evidence.citations.join(", ")})`)
    .join("; ");
  const support = evidenceText || "no high-confidence synthetic evidence selected";

  return `${company.description} Selected synthetic evidence: ${support}. This ${conclusion}.`;
}

function groupEvidenceByKind(notebook: RankedEvidence[]): Record<string, RankedEvidence[]> {
  return notebook.reduce<Record<string, RankedEvidence[]>>((groups, item) => {
    groups[item.evidence.kind] = [...(groups[item.evidence.kind] ?? []), item];
    return groups;
  }, {});
}

function buildMemoSynthesis(kind: string, items: RankedEvidence[]): string {
  const signalSummary = [...new Set(items.flatMap((item) => item.evidence.signals))].join(", ");
  const citationSummary = items.flatMap((item) => item.evidence.citations).join(", ");

  return `${kind} sources contribute ${signalSummary || "no"} signals using synthetic citations ${citationSummary || "none"}. This memo summarizes seeded public-style notes only and does not establish investable facts.`;
}

function buildUnresolvedQuestions(items: RankedEvidence[]): string[] {
  const questions = items.flatMap((item) =>
    item.evidence.signals.includes("risk")
      ? [`What reviewer evidence would reduce uncertainty in ${item.evidence.title}?`]
      : [`Which synthetic citation should be re-read for ${item.evidence.title}?`]
  );

  return questions.slice(0, 3);
}

function assembleReviewTasks(notebook: RankedEvidence[]): ReviewTask[] {
  const selectedEvidenceIds = new Set(notebook.slice(0, 3).map((item) => item.evidence.id));

  return reviewTasks.map((task) => ({
    ...task,
    relatedEvidenceIds: task.relatedEvidenceIds.filter((id) => selectedEvidenceIds.has(id))
  }));
}

function normalizeSignals(
  selectedSignals: EvidenceSignal[],
  company: SyntheticCompany,
  analyst: AnalystPersona
): EvidenceSignal[] {
  const signals = selectedSignals.length > 0 ? selectedSignals : [...company.tags, ...analyst.reviewFocus];
  return [...new Set(signals)].slice(0, 4);
}

function findAnalyst(id: string): AnalystPersona {
  const analyst = analysts.find((candidate) => candidate.id === id);
  if (!analyst) {
    throw new Error(`Unknown synthetic analyst '${id}'.`);
  }

  return analyst;
}

function findCompany(id: string): SyntheticCompany {
  const company = companies.find((candidate) => candidate.id === id);
  if (!company) {
    throw new Error(`Unknown synthetic company '${id}'.`);
  }

  return company;
}
