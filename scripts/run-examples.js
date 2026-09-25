// Master Scenes Skill by Daniel Rodrigues
//
// scripts/run-examples.js
// Minimal acceptance-test runner. Runs validate-format.js against every
// .fountain file in examples/ and checks the result against the
// expectations documented in examples/edge-cases.md. Exits non-zero on
// mismatch so this can be wired into CI later.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { validateFormat } from "./validate-format.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const examplesDir = join(__dirname, "..", "examples");

// Matches the expectations written out in examples/edge-cases.md.
const EXPECTATIONS = {
  "golden-page.fountain": { maxSeverity: null }, // no error-severity findings
  "montage-intercut.fountain": { maxSeverity: null }, // no error-severity findings
  "dual-dialogue.fountain": { maxSeverity: null },
  "more-contd.fountain": { maxSeverityAbove: "info" }, // no findings above info
};

function severityRank(s) {
  return { info: 0, style: 1, warning: 2, error: 3 }[s] ?? -1;
}

function run() {
  const files = readdirSync(examplesDir).filter((f) => f.endsWith(".fountain"));
  let failures = 0;

  for (const file of files) {
    const expectation = EXPECTATIONS[file];
    if (!expectation) {
      console.log(`SKIP  ${file} (no expectation defined)`);
      continue;
    }

    const text = readFileSync(join(examplesDir, file), "utf-8");
    const lines = text.split(/\r?\n/);
    const { findings } = validateFormat(lines);

    const worst = findings.reduce((max, f) => Math.max(max, severityRank(f.severity)), -1);
    const ceiling = expectation.maxSeverityAbove
      ? severityRank(expectation.maxSeverityAbove)
      : severityRank("info") - 1; // "no error findings" default: allow up to style/warning per docs

    // golden-page / montage-intercut / dual-dialogue only promise
    // "no error-severity findings" — allow anything below error.
    const errorRank = severityRank("error");
    const passed = expectation.maxSeverityAbove
      ? worst <= severityRank(expectation.maxSeverityAbove)
      : worst < errorRank;

    if (passed) {
      console.log(`PASS  ${file}`);
    } else {
      failures += 1;
      console.log(`FAIL  ${file}`);
      for (const f of findings) {
        console.log(`      [${f.severity}] ${f.rule_id} (line ${f.line}): ${f.message}`);
      }
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} example(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll examples passed.");
}

run();

// Master Scenes Skill by Daniel Rodrigues
