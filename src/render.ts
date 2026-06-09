import type { ResearchProject, WorkspaceCatalog } from "./types";

export function renderWorkspace(catalog: WorkspaceCatalog, project: ResearchProject): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kimpton AI Public Research Workspace</title>
  <style>${css()}</style>
</head>
<body>
  <header class="hero">
    <p class="eyebrow">Clean-room public concept</p>
    <h1>AI-native investment research workspace</h1>
    <p>${escapeHtml(catalog.disclaimer)}</p>
  </header>
  <main>
    <section class="panel onboarding">
      <div>
        <p class="eyebrow">Onboarding</p>
        <h2>${escapeHtml(project.analyst.name)}</h2>
        <p>${escapeHtml(project.analyst.role)} covering ${project.analyst.coverage.map(escapeHtml).join(", ")}.</p>
      </div>
      <div>
        <p class="eyebrow">Project Setup</p>
        <h2>${escapeHtml(project.company.name)}</h2>
        <p>${escapeHtml(project.objective)}</p>
        <div class="chips">${project.selectedSignals.map((signal) => `<span>${escapeHtml(signal)}</span>`).join("")}</div>
      </div>
    </section>
    <section class="grid">
      <article class="panel notebook">
        <p class="eyebrow">Evidence Notebook</p>
        <h2>Synthetic evidence ranked for review</h2>
        ${project.notebook.map(renderEvidence).join("")}
      </article>
      <article class="panel thesis">
        <p class="eyebrow">Thesis Generation</p>
        <h2>Draft cases for analyst review</h2>
        ${project.theses.map(renderThesis).join("")}
      </article>
    </section>
    <section class="grid">
      <article class="panel tasks">
        <p class="eyebrow">Analyst Review</p>
        <h2>Task status</h2>
        <div class="status-row">${Object.entries(project.statusSummary)
          .map(([status, count]) => `<span><strong>${count}</strong>${escapeHtml(status)}</span>`)
          .join("")}</div>
        ${project.reviewTasks.map(renderTask).join("")}
      </article>
      <article class="panel integrations">
        <p class="eyebrow">Mocked Integrations</p>
        <h2>Local connectors only</h2>
        ${project.integrations.map(renderIntegration).join("")}
      </article>
    </section>
  </main>
  <script>
    window.__WORKSPACE_SEED__ = ${JSON.stringify({ catalog, project })};
  </script>
</body>
</html>`;
}

function renderEvidence(item: ResearchProject["notebook"][number]): string {
  return `<div class="card evidence">
    <div><strong>${escapeHtml(item.evidence.title)}</strong><span>${escapeHtml(item.evidence.kind)} · score ${item.score}</span></div>
    <p>${escapeHtml(item.evidence.summary)}</p>
    <small>${item.reasons.map(escapeHtml).join(" | ")}</small>
  </div>`;
}

function renderThesis(section: ResearchProject["theses"][number]): string {
  return `<div class="card thesis-card">
    <span class="case">${escapeHtml(section.case)}</span>
    <h3>${escapeHtml(section.headline)}</h3>
    <p>${escapeHtml(section.narrative)}</p>
  </div>`;
}

function renderTask(task: ResearchProject["reviewTasks"][number]): string {
  return `<div class="card task">
    <strong>${escapeHtml(task.title)}</strong>
    <span>${escapeHtml(task.status)} · ${task.riskFlags.map(escapeHtml).join(", ")}</span>
  </div>`;
}

function renderIntegration(integration: ResearchProject["integrations"][number]): string {
  return `<div class="card integration">
    <strong>${escapeHtml(integration.name)}</strong>
    <span>${escapeHtml(integration.status)} · ${escapeHtml(integration.category)}</span>
    <p>${escapeHtml(integration.description)}</p>
  </div>`;
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function css(): string {
  return `
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #080b12; color: #edf2ff; }
    * { box-sizing: border-box; }
    body { margin: 0; background: radial-gradient(circle at top left, #263a63 0, transparent 34rem), #080b12; }
    .hero { padding: 4rem clamp(1rem, 4vw, 5rem) 2rem; max-width: 76rem; }
    .hero h1 { font-size: clamp(2.4rem, 6vw, 5.6rem); line-height: .92; margin: .3rem 0 1rem; letter-spacing: -.07em; }
    .hero p { color: #b9c7df; max-width: 58rem; }
    main { padding: 0 clamp(1rem, 4vw, 5rem) 4rem; display: grid; gap: 1rem; }
    .grid, .onboarding { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .panel { border: 1px solid rgba(180, 204, 255, .16); background: rgba(12, 18, 31, .78); border-radius: 1.5rem; padding: 1.25rem; box-shadow: 0 24px 80px rgba(0, 0, 0, .28); }
    .eyebrow { margin: 0 0 .5rem; color: #81e6d9; text-transform: uppercase; font-size: .76rem; letter-spacing: .16em; }
    h2 { margin: 0 0 .75rem; font-size: 1.35rem; }
    h3 { margin: .5rem 0; }
    p { color: #c7d2e5; }
    .chips { display: flex; gap: .5rem; flex-wrap: wrap; }
    .chips span, .case { border: 1px solid rgba(129, 230, 217, .35); color: #a7fff5; border-radius: 999px; padding: .25rem .65rem; font-size: .78rem; }
    .card { border-top: 1px solid rgba(180, 204, 255, .12); padding: .9rem 0; }
    .card div, .card span { display: block; color: #9fb0cc; margin-top: .25rem; }
    .status-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: .5rem; margin: 1rem 0; }
    .status-row span { background: #111a2c; border-radius: .85rem; padding: .8rem; color: #a9b7ce; }
    .status-row strong { display: block; color: white; font-size: 1.4rem; }
    small { color: #8ea2bf; }
    @media (max-width: 820px) { .grid, .onboarding { grid-template-columns: 1fr; } .status-row { grid-template-columns: repeat(2, 1fr); } }
  `;
}
