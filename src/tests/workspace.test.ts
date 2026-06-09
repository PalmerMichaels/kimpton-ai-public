import assert from "node:assert/strict";
import { createResearchProject, generateThesisSections, getCatalog, rankEvidence, summarizeTaskStatus } from "../workspace";
import { companies } from "../data/syntheticResearchData";

function runTests(): void {
  testCatalogContainsSyntheticInputs();
  testProjectBuildsEvidenceNotebookAndTheses();
  testEvidenceRankingPrioritizesSelectedSignals();
  testReviewStatusSummaryIncludesAllStates();
  testDisclaimersRejectAdviceAndLiveData();
  console.log("All validation tests passed.");
}

function testCatalogContainsSyntheticInputs(): void {
  const catalog = getCatalog();

  assert.equal(catalog.analysts.length, 3);
  assert.equal(catalog.companies.length, 3);
  assert.equal(catalog.integrations.every((integration) => integration.status !== "paused"), true);
  assert(catalog.disclaimer.includes("synthetic research data"));
}

function testProjectBuildsEvidenceNotebookAndTheses(): void {
  const project = createResearchProject({
    analystId: "maya",
    companyId: "aurora-ledger",
    objective: "Assess synthetic growth and risk evidence.",
    selectedSignals: ["growth", "risk"]
  });

  assert.equal(project.id, "research-aurora-ledger-maya");
  assert.equal(project.notebook.length, 3);
  assert.equal(project.theses.length, 3);
  assert(project.theses.some((section) => section.case === "bear"));
  assert(project.reviewTasks.length > 0);
}

function testEvidenceRankingPrioritizesSelectedSignals(): void {
  const ranked = rankEvidence("northstar-grid", ["risk", "valuation"], ["risk"]);

  assert.equal(ranked[0]?.evidence.id, "northstar-valuation-note");
  assert(ranked[0]?.reasons.some((reason) => reason.includes("project signal risk")));
  assert(ranked[0]?.reasons.some((reason) => reason.includes("project signal valuation")));
}

function testReviewStatusSummaryIncludesAllStates(): void {
  const summary = summarizeTaskStatus([
    { id: "a", title: "A", ownerId: "maya", status: "todo", relatedEvidenceIds: [], riskFlags: [] },
    { id: "b", title: "B", ownerId: "dev", status: "approved", relatedEvidenceIds: [], riskFlags: [] }
  ]);

  assert.deepEqual(summary, { todo: 1, in_review: 0, blocked: 0, approved: 1 });
}

function testDisclaimersRejectAdviceAndLiveData(): void {
  const company = companies.find((candidate) => candidate.id === "civic-signal");
  assert(company);

  const theses = generateThesisSections(company, rankEvidence(company.id, ["risk"], ["governance"]));
  const text = theses.map((section) => section.narrative).join(" ");
  const project = createResearchProject({
    analystId: "dev",
    companyId: "civic-signal",
    objective: "Review synthetic downside evidence.",
    selectedSignals: ["risk", "governance"]
  });

  assert(project.disclaimer.includes("Not investment advice"));
  assert(project.disclaimer.includes("not connected to live market data"));
  assert(!text.toLowerCase().includes("buy"));
  assert(!text.toLowerCase().includes("sell"));
}

runTests();
