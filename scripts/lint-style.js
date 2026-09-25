// Master Scenes Skill by Daniel Rodrigues
//
// scripts/lint-style.js
// Original, dependency-free ES module. Checks soft-style rules only
// (never format errors): overlong action paragraphs, "WE SEE" density,
// and wryly (emotion-parenthetical) overuse. Returns structured findings,
// never throws.

const WE_SEE_PATTERN = /\bWE\s+(SEE|PAN|PUSH|CUT|HEAR|FIND)\b/gi;
// A crude heuristic: a parenthetical that is not an obvious physical
// action tends to be a single adverb/adjective-like word — flag those.
const WRYLY_HINT_PATTERN = /^\(\s*[a-zA-Z]+ly\s*\)$|^\(\s*(angrily|sadly|happily|sarcastically|quietly|bitterly|nervously|calmly)\s*\)$/i;

export function lintStyle(lines, options = {}) {
  const maxParagraphLines = options.maxParagraphLines ?? 4;
  const findings = [];

  const fullText = lines.join("\n");
  const weSeeMatches = fullText.match(WE_SEE_PATTERN) || [];
  if (weSeeMatches.length > 0) {
    findings.push({
      rule_id: "STYLE-WESEE-001",
      severity: "style",
      message: `High density of 'WE SEE'-style constructions (${weSeeMatches.length} occurrences).`,
    });
  }

  let wrylyCount = 0;
  let paragraphLineCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed.length === 0) {
      paragraphLineCount = 0;
      continue;
    }

    if (/^\(.*\)$/.test(trimmed)) {
      if (WRYLY_HINT_PATTERN.test(trimmed)) {
        wrylyCount += 1;
      }
      continue;
    }

    const letters = trimmed.replace(/[^A-Za-z]/g, "");
    const isAllCaps = letters.length > 0 && letters === letters.toUpperCase();
    if (isAllCaps) {
      paragraphLineCount = 0;
      continue;
    }

    paragraphLineCount += 1;
    if (paragraphLineCount === maxParagraphLines + 1) {
      findings.push({
        rule_id: "ACT-001",
        severity: "style",
        line: i + 1,
        message: `Action paragraph exceeds ${maxParagraphLines} lines.`,
      });
    }
  }

  if (wrylyCount > 0) {
    findings.push({
      rule_id: "STYLE-WRYLY-001",
      severity: "style",
      message: `Found ${wrylyCount} parenthetical(s) that look like emotion/acting-direction ("wrylies") rather than physical action.`,
    });
  }

  return { ok: true, findings };
}

export default lintStyle;

// Master Scenes Skill by Daniel Rodrigues
