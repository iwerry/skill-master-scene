// Master Scenes Skill by Daniel Rodrigues
//
// scripts/convert-fountain.js
// Original, dependency-free ES module implementing the documented mapping
// in references/10-fountain-mapping.md between plain text and Fountain.
// No code was read from, or adapted out of, any third-party Fountain
// parser or screenwriting application.
//
// Exposes:
//   parseFountain(text) -> { ok, elements: [{ type, text, raw }], errors }
//   toPlainText(elements) -> string

const SCENE_HEADING_PREFIXES = ["INT.", "EXT.", "EST.", "I/E.", "INT/EXT."];

function stripBoneyard(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, "");
}

function extractNotes(text) {
  const notes = [];
  const cleaned = text.replace(/\[\[([\s\S]*?)\]\]/g, (_, note) => {
    notes.push(note.trim());
    return "";
  });
  return { cleaned, notes };
}

function classifyLine(rawLine, prevType) {
  const line = rawLine.trim();
  if (line.length === 0) return { type: "blank", text: "" };

  // Forced overrides.
  if (line.startsWith(".") && !line.startsWith("..")) {
    return { type: "scene_heading", text: line.slice(1).trim().toUpperCase() };
  }
  if (line.startsWith("!")) {
    return { type: "action", text: line.slice(1).trim() };
  }
  if (line.startsWith("@")) {
    return { type: "character", text: line.slice(1).trim().toUpperCase(), dual: line.trim().endsWith("^") };
  }
  if (line.startsWith(">")) {
    return { type: "transition", text: line.slice(1).trim().toUpperCase() };
  }

  // Heuristic detection.
  const upper = line.toUpperCase();
  if (SCENE_HEADING_PREFIXES.some((p) => upper.startsWith(p))) {
    return { type: "scene_heading", text: upper };
  }
  if (/^\(.*\)$/.test(line)) {
    return { type: "parenthetical", text: line };
  }
  const letters = line.replace(/[^A-Za-z]/g, "");
  const isAllCaps = letters.length > 0 && letters === letters.toUpperCase();
  if (isAllCaps && (upper.endsWith("TO:") || upper === "FADE OUT." || upper === "CUT TO BLACK." || upper === "FREEZE FRAME")) {
    return { type: "transition", text: upper };
  }
  if (isAllCaps && prevType !== "character" && line.length < 60) {
    const dual = line.trim().endsWith("^");
    return { type: "character", text: dual ? line.trim().slice(0, -1).trim() : line, dual };
  }
  if (prevType === "character" || prevType === "parenthetical" || prevType === "dialogue") {
    return { type: "dialogue", text: line };
  }
  return { type: "action", text: line };
}

export function parseFountain(rawText) {
  if (typeof rawText !== "string") {
    return { ok: false, elements: [], notes: [], errors: ["Input must be a string."] };
  }

  const withoutBoneyard = stripBoneyard(rawText);
  const { cleaned, notes } = extractNotes(withoutBoneyard);
  const lines = cleaned.split(/\r?\n/);
  const elements = [];
  let prevType = null;

  for (const rawLine of lines) {
    const classified = classifyLine(rawLine, prevType);
    if (classified.type === "blank") {
      prevType = null;
      continue;
    }
    elements.push({ ...classified, raw: rawLine });
    prevType = classified.type;
  }

  return { ok: true, elements, notes, errors: [] };
}

export function toPlainText(elements) {
  if (!Array.isArray(elements)) return "";
  const lines = [];
  for (const el of elements) {
    switch (el.type) {
      case "scene_heading":
        lines.push("", el.text.toUpperCase());
        break;
      case "character":
        lines.push("", "          " + el.text.toUpperCase() + (el.dual ? " ^" : ""));
        break;
      case "parenthetical":
        lines.push("               " + el.text);
        break;
      case "dialogue":
        lines.push("     " + el.text);
        break;
      case "transition":
        lines.push("", "                              " + el.text.toUpperCase());
        break;
      default:
        lines.push(el.text);
    }
  }
  return lines.join("\n").trim() + "\n";
}

export default { parseFountain, toPlainText };

// Master Scenes Skill by Daniel Rodrigues
