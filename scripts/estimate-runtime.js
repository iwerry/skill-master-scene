// Master Scenes Skill by Daniel Rodrigues
//
// scripts/estimate-runtime.js
// Original, dependency-free ES module. Estimates screen-time minutes from
// page count (primary) or line count (fallback), using the documented
// 1-page-≈-1-minute convention from format-profile.yaml.
//
// Never throws unstructured errors — invalid input returns a structured
// result with ok: false and an explanation.

const LINES_PER_PAGE_DEFAULT = 55;

export function estimateRuntimeFromPages(pageCount) {
  if (typeof pageCount !== "number" || !Number.isFinite(pageCount) || pageCount < 0) {
    return { ok: false, error: "pageCount must be a non-negative finite number.", minutes: null, notes: [] };
  }

  const minutes = pageCount; // 1 page ≈ 1 minute, the documented ratio.
  const notes = [];

  if (pageCount < 90) {
    notes.push({ rule_id: "RUNTIME-001", severity: "warning", message: `Page count (${pageCount}) is below the 90-page hard minimum for a feature spec script.` });
  }
  if (pageCount > 120) {
    notes.push({ rule_id: "RUNTIME-002", severity: "warning", message: `Page count (${pageCount}) is above the 120-page hard maximum — this reads as shooting-script territory, not spec.` });
  }
  if (pageCount < 100 || pageCount > 110) {
    notes.push({ rule_id: "RUNTIME-003", severity: "style", message: `Page count (${pageCount}) is outside the 100–110 page target range for a typical feature.` });
  }

  return { ok: true, minutes, method: "pages", notes };
}

export function estimateRuntimeFromLines(lineCount, linesPerPage = LINES_PER_PAGE_DEFAULT) {
  if (typeof lineCount !== "number" || !Number.isFinite(lineCount) || lineCount < 0) {
    return { ok: false, error: "lineCount must be a non-negative finite number.", minutes: null, notes: [] };
  }
  if (typeof linesPerPage !== "number" || linesPerPage <= 0) {
    return { ok: false, error: "linesPerPage must be a positive number.", minutes: null, notes: [] };
  }

  const estimatedPages = lineCount / linesPerPage;
  const result = estimateRuntimeFromPages(estimatedPages);
  return { ...result, method: "lines_fallback", estimated_pages: estimatedPages };
}

export default { estimateRuntimeFromPages, estimateRuntimeFromLines };

// Master Scenes Skill by Daniel Rodrigues
