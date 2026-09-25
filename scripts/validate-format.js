// Master Scenes Skill by Daniel Rodrigues
//
// scripts/validate-format.js
// Original, dependency-free ES module. Parses a plain-text screenplay
// representation and returns structured findings (rule ID + severity),
// never throws unstructured errors.
//
// Input: a screenplay as an array of lines (strings), plus an optional
// profile object shaped like format-profile.yaml (defaults to the
// us-studio-feature values baked in below if none is supplied), and an
// optional mode ("spec" | "shooting" | "production" | "table-read"),
// defaulting to "spec" per format-profile.yaml.
//
// Output: { ok: boolean, findings: [{ rule_id, severity, line, message }] }
//
// SCOPE NOTE (intentional, not a bug):
// Two rules from data/severity-matrix.yaml are NOT implemented here:
//   - CHAR-002 (character cue physical column position 3.7-4.2in) —
//     requires a laid-out/rendered page; plain text has no real inch
//     position to measure, only leading whitespace, which is not a
//     reliable proxy across sources (Fountain, .txt, pasted text).
//   - DIAL-MORE-001 (MORE/CONT'D missing across a *page break*) —
//     requires knowing where actual page breaks fall, which plain text
//     without pagination does not encode. Feeding a page-broken
//     representation (e.g. an array of pages) is a documented future
//     extension point, not implemented in v1.1.0.
// Both stay documented in data/severity-matrix.yaml as available rule
// IDs for a caller that has access to rendered/paginated input.

const DEFAULT_PROFILE = {
  lines_per_page: { min: 45, max: 65 },
  left_margin_in: 1.5,
  right_margin_in: { min: 0.5, max: 1.25 },
  character_left_in: { min: 3.7, max: 4.2 },
  max_action_paragraph_lines: 4,
};

const SCENE_HEADING_PREFIXES = ["INT.", "EXT.", "EST.", "I/E.", "INT/EXT."];
const TRANSITIONS_SUFFIX = "TO:";
const KNOWN_TIME_OF_DAY = [
  "DAY", "NIGHT", "AFTERNOON", "MORNING", "EVENING",
  "LATER", "SAME", "MOMENTS LATER", "CONTINUOUS",
];
// A crude heuristic for a "wryly" parenthetical, matching the one used
// in scripts/lint-style.js for consistency.
const WRYLY_HINT_PATTERN = /^\(\s*[a-zA-Z]+ly\s*\)$|^\(\s*(angrily|sadly|happily|sarcastically|quietly|bitterly|nervously|calmly)\s*\)$/i;
const SCENE_NUMBER_PATTERN = /#\s*[\w-]+\s*#\s*$/; // Fountain-style "#12#" at end of line

function isAllCaps(text) {
  const letters = text.replace(/[^A-Za-z]/g, "");
  if (letters.length === 0) return true;
  return letters === letters.toUpperCase();
}

function looksLikeSceneHeading(line) {
  const trimmed = line.trim().toUpperCase();
  return SCENE_HEADING_PREFIXES.some((p) => trimmed.startsWith(p));
}

// SH-002: a line that quacks like a scene heading (all caps, ends with a
// recognized time-of-day after a dash) but is missing the INT./EXT./etc.
// prefix. Deliberately narrow to avoid misfiring on transitions/character
// cues that happen to be all caps.
function looksLikeHeadingMissingPrefix(line) {
  const trimmed = line.trim();
  if (trimmed.length === 0) return false;
  if (looksLikeSceneHeading(trimmed)) return false;
  if (!isAllCaps(trimmed)) return false;
  const upper = trimmed.toUpperCase();
  const dashSplit = upper.split(/\s[-–]\s/);
  if (dashSplit.length < 2) return false;
  const tail = dashSplit[dashSplit.length - 1].trim();
  return KNOWN_TIME_OF_DAY.some((t) => tail === t || tail.startsWith(t));
}

function looksLikeCharacterCue(line, nextLine) {
  const trimmed = line.trim();
  if (trimmed.length === 0) return false;
  if (looksLikeSceneHeading(trimmed)) return false;
  const bareName = trimmed.replace(/\s*\((V\.O\.|O\.S\.|O\.C\.|CONT'D)\)\s*$/i, "");
  return isAllCaps(bareName) && bareName.length > 0 && nextLine !== undefined;
}

function looksLikeTransition(line) {
  const trimmed = line.trim().toUpperCase();
  return isAllCaps(trimmed) && trimmed.length > 0 && (trimmed.endsWith(TRANSITIONS_SUFFIX) || trimmed === "FADE OUT." || trimmed === "CUT TO BLACK." || trimmed === "FREEZE FRAME");
}

function isParentheticalLine(line) {
  return /^\(.*\)$/.test(line.trim());
}

export function validateFormat(lines, profile = DEFAULT_PROFILE, mode = "spec") {
  const findings = [];
  let actionBuffer = 0;
  let prevWasParenthetical = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      actionBuffer = 0;
      prevWasParenthetical = false;
      continue;
    }

    if (looksLikeSceneHeading(trimmed)) {
      if (!isAllCaps(trimmed)) {
        findings.push({ rule_id: "SH-001", severity: "error", line: i + 1, message: "Scene heading is not in ALL CAPS." });
      }
      if (!/-\s*\S/.test(trimmed) && !/–\s*\S/.test(trimmed)) {
        findings.push({ rule_id: "SH-003", severity: "warning", line: i + 1, message: "Scene heading is missing a time-of-day component after the dash." });
      }
      if (mode === "spec" && SCENE_NUMBER_PATTERN.test(trimmed)) {
        findings.push({ rule_id: "SCENE-NUM-001", severity: "info", line: i + 1, message: "Scene numbers present in a 'spec' mode script — scene numbers are conventionally reserved for shooting/production drafts." });
      }
      const hasFollowingContent = lines.slice(i + 1).some((l) => l.trim().length > 0);
      if (!hasFollowingContent) {
        findings.push({ rule_id: "SH-ORPHAN-001", severity: "error", line: i + 1, message: "Scene heading appears at the end of the script with no following action." });
      }
      actionBuffer = 0;
      prevWasParenthetical = false;
      continue;
    }

    if (looksLikeHeadingMissingPrefix(trimmed)) {
      findings.push({ rule_id: "SH-002", severity: "warning", line: i + 1, message: "Scene heading is missing a recognized INT./EXT./EST./I/E./INT/EXT. prefix." });
      actionBuffer = 0;
      prevWasParenthetical = false;
      continue;
    }

    if (looksLikeTransition(trimmed)) {
      const upper = trimmed.toUpperCase();
      const isFreezeFrame = upper.startsWith("FREEZE FRAME");
      if (isFreezeFrame) {
        const hasColon = upper.includes(":");
        const nextContentLine = lines.slice(i + 1).find((l) => l.trim().length > 0);
        if (hasColon || nextContentLine !== undefined) {
          findings.push({ rule_id: "FREEZE-001", severity: "warning", line: i + 1, message: "FREEZE FRAME is followed by a colon or by further action description, which is non-standard." });
        }
      } else if (!upper.endsWith(TRANSITIONS_SUFFIX) && upper !== "FADE OUT." && upper !== "CUT TO BLACK.") {
        findings.push({ rule_id: "TRANS-001", severity: "style", line: i + 1, message: "Transition does not end in 'TO:' — this is a convention, not a requirement." });
      }
      actionBuffer = 0;
      prevWasParenthetical = false;
      continue;
    }

    if (/^".*"$|^'.*'$/.test(trimmed) === false && /".+"/.test(trimmed)) {
      findings.push({ rule_id: "DIAL-001", severity: "error", line: i + 1, message: "Dialogue-like line uses quotation marks, which is non-standard." });
    }

    const nextLine = lines[i + 1];
    if (looksLikeCharacterCue(trimmed, nextLine)) {
      const bareName = trimmed.replace(/\s*\((V\.O\.|O\.S\.|O\.C\.|CONT'D)\)\s*$/i, "");
      if (!isAllCaps(bareName)) {
        findings.push({ rule_id: "CHAR-001", severity: "error", line: i + 1, message: "Character name is not in ALL CAPS." });
      }
      actionBuffer = 0;
      prevWasParenthetical = false;
      continue;
    }

    if (isParentheticalLine(trimmed)) {
      if (prevWasParenthetical) {
        findings.push({ rule_id: "PAREN-001", severity: "warning", line: i + 1, message: "Parenthetical is longer than 1 line." });
      }
      if (WRYLY_HINT_PATTERN.test(trimmed)) {
        findings.push({ rule_id: "PAREN-002", severity: "style", line: i + 1, message: "Parenthetical appears to describe emotion/acting direction ('wryly') rather than a brief physical action — consider cutting it." });
      }
      prevWasParenthetical = true;
      continue;
    }
    prevWasParenthetical = false;

    // Otherwise treat as action/dialogue prose; track paragraph length for ACT-001.
    actionBuffer += 1;
    if (actionBuffer > profile.max_action_paragraph_lines) {
      findings.push({
        rule_id: "ACT-001",
        severity: "style",
        line: i + 1,
        message: `Action paragraph is longer than ${profile.max_action_paragraph_lines} lines.`,
      });
    }
  }

  return {
    ok: findings.every((f) => f.severity !== "error"),
    findings,
  };
}

export default validateFormat;

// Master Scenes Skill by Daniel Rodrigues
