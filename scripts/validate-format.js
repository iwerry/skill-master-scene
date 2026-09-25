// Master Scenes Skill by Daniel Rodrigues
//
// scripts/validate-format.js
// Original, dependency-free ES module. Parses a plain-text screenplay
// representation and returns structured findings (rule ID + severity),
// never throws unstructured errors.
//
// Input: a screenplay as an array of lines (strings), plus an optional
// profile object shaped like format-profile.yaml (defaults to the
// us-studio-feature values baked in below if none is supplied).
//
// Output: { ok: boolean, findings: [{ rule_id, severity, line, message }] }

const DEFAULT_PROFILE = {
  lines_per_page: { min: 45, max: 65 },
  left_margin_in: 1.5,
  right_margin_in: { min: 0.5, max: 1.25 },
  character_left_in: { min: 3.7, max: 4.2 },
  max_action_paragraph_lines: 4,
};

const SCENE_HEADING_PREFIXES = ["INT.", "EXT.", "EST.", "I/E.", "INT/EXT."];
const TRANSITIONS_SUFFIX = "TO:";

function isAllCaps(text) {
  const letters = text.replace(/[^A-Za-z]/g, "");
  if (letters.length === 0) return true;
  return letters === letters.toUpperCase();
}

function looksLikeSceneHeading(line) {
  const trimmed = line.trim().toUpperCase();
  return SCENE_HEADING_PREFIXES.some((p) => trimmed.startsWith(p));
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

export function validateFormat(lines, profile = DEFAULT_PROFILE) {
  const findings = [];
  let actionBuffer = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      actionBuffer = 0;
      continue;
    }

    if (looksLikeSceneHeading(trimmed)) {
      if (!isAllCaps(trimmed)) {
        findings.push({ rule_id: "SH-001", severity: "error", line: i + 1, message: "Scene heading is not in ALL CAPS." });
      }
      if (!/-\s*\S/.test(trimmed) && !/–\s*\S/.test(trimmed)) {
        findings.push({ rule_id: "SH-003", severity: "warning", line: i + 1, message: "Scene heading is missing a time-of-day component after the dash." });
      }
      const hasFollowingContent = lines.slice(i + 1).some((l) => l.trim().length > 0);
      if (!hasFollowingContent) {
        findings.push({ rule_id: "SH-ORPHAN-001", severity: "error", line: i + 1, message: "Scene heading appears at the end of the script with no following action." });
      }
      actionBuffer = 0;
      continue;
    }

    if (looksLikeTransition(trimmed)) {
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
      continue;
    }

    if (/^\(.*\)$/.test(trimmed)) {
      continue;
    }

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
