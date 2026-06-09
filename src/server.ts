#!/usr/bin/env node
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { URL } from "node:url";
import { getCatalog, createResearchProject } from "./workspace";
import { renderWorkspace } from "./render";
import type { EvidenceSignal, ResearchProjectInput } from "./types";

const defaultInput: ResearchProjectInput = {
  analystId: "maya",
  companyId: "aurora-ledger",
  objective: "Draft an evidence-backed synthetic research brief for analyst review.",
  selectedSignals: ["growth", "margin", "risk", "valuation"]
};

export function buildDefaultProject() {
  return createResearchProject(defaultInput);
}

export function createWorkspaceServer() {
  return createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");

    if (url.pathname === "/") {
      const catalog = getCatalog();
      const project = createResearchProject(readProjectInput(url));
      send(response, 200, "text/html; charset=utf-8", renderWorkspace(catalog, project));
      return;
    }

    if (url.pathname === "/api/catalog") {
      sendJson(response, getCatalog());
      return;
    }

    if (url.pathname === "/api/project") {
      sendJson(response, createResearchProject(readProjectInput(url)));
      return;
    }

    sendJson(response, { error: "Not found" }, 404);
  });
}

function readProjectInput(url: URL): ResearchProjectInput {
  const signalParam = url.searchParams.get("signals");
  const selectedSignals = signalParam
    ? signalParam.split(",").map((signal) => signal.trim()).filter(Boolean) as EvidenceSignal[]
    : defaultInput.selectedSignals;

  return {
    analystId: url.searchParams.get("analyst") ?? defaultInput.analystId,
    companyId: url.searchParams.get("company") ?? defaultInput.companyId,
    objective: url.searchParams.get("objective") ?? defaultInput.objective,
    selectedSignals
  };
}

function sendJson(response: ServerResponse<IncomingMessage>, payload: unknown, status = 200): void {
  send(response, status, "application/json; charset=utf-8", JSON.stringify(payload, null, 2));
}

function send(response: ServerResponse<IncomingMessage>, status: number, contentType: string, body: string): void {
  response.writeHead(status, {
    "content-type": contentType,
    "cache-control": "no-store"
  });
  response.end(body);
}

function main(): void {
  if (process.argv.includes("--smoke")) {
    const project = buildDefaultProject();
    console.log(JSON.stringify({
      projectId: project.id,
      evidenceCount: project.notebook.length,
      thesisCount: project.theses.length,
      disclaimer: project.disclaimer
    }, null, 2));
    return;
  }

  const port = Number(process.env.PORT ?? 3000);
  createWorkspaceServer().listen(port, () => {
    console.log(`Kimpton AI public demo running at http://localhost:${port}`);
  });
}

main();
