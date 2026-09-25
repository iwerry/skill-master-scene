Master Scenes Skill by Daniel Rodrigues

---
name: skill-master-scene
version: 1.0.0
description: >
  Encodes the Master Scene (industry-standard "spec format") screenplay layout
  as structured, verifiable knowledge — exact page geometry, element grammar,
  page-break rules, duration model, writer/director archetypes, and
  cultural/industry profiles. Use this skill whenever a user asks to format,
  validate, convert, lint, or reason about a screenplay in standard/master
  scene/spec format, needs Fountain or .fdx interchange, wants runtime
  estimates from page count, or is building tooling (a formatter, linter,
  parser, or generator) for screenplay text. Trigger even if the user only
  says "format this like a real screenplay," "is this in the right script
  format," "convert to Fountain," or names a specific writer/director style
  (e.g. "write this the way Nolan formats his shooting scripts").
author: Daniel Rodrigues
license: see LICENSE.md
---

# Master Scenes Skill

This package is a **knowledge engine**, not a screenplay. It gives an AI agent
everything it needs to format, validate, convert, and reason about screenplays
written in the Master Scene / spec-format standard, without hallucinating
margins or inventing rules.

## What "Master Scene" means

Master Scene format (a.k.a. "standard screenplay format" or "spec format") is
the international industry-standard layout for screenplays, named for the
**master scene heading** (slugline) that opens every scene. It is a strict
grammar of element types and page positions, calibrated so that one page of
script ≈ one minute of screen time. See `references/01-element-grammar.md`
and `references/02-page-geometry.md` for the full ground truth.

## Module index (3 focused modules)

This skill is intentionally split into three sub-skills. Load only what the
task needs — don't read every reference file for every request.

1. **`skill-screenplay-format`** — the grammar, page geometry, and cultural
   profiles. Start here for: "is this formatted correctly," "what goes where,"
   "how do I write a [montage/dual dialogue/transition]," or picking a
   writer/director archetype or a market profile.
   - Reads: `format-profile.yaml`, `data/element-coordinates.yaml`,
     `references/01-05`, `references/08-09`, `profiles/*.yaml`.
2. **`skill-screenplay-validate`** — the linters and severity matrix. Start
   here for: "check this script," "what's wrong with my formatting,"
   "is this page-break legal."
   - Reads: `data/severity-matrix.yaml`, `scripts/validate-format.js`,
     `scripts/lint-style.js`, `references/03-04`, `references/06`.
3. **`skill-screenplay-export`** — interchange and runtime. Start here for:
   "convert to Fountain," "export to .fdx," "how many pages/minutes is this."
   - Reads: `scripts/convert-fountain.js`, `scripts/estimate-runtime.js`,
     `references/10-fountain-mapping.md`.

## Workflow

1. **Identify the task type**: formatting question, validation/lint request,
   or conversion/export request. Pick the matching module above.
2. **Identify the profile**: default to `profiles/us-studio-feature.yaml`
   (the fully-verified reference standard) unless the user names a market,
   medium, or archetype (TV, telenovela, anime, audio drama, a specific
   writer/director style — see `references/08-archetypes.md` and
   `references/09-cultural-profiles.md`).
3. **Load only the needed reference files** — see the module index above.
   Bundled resources are loaded on demand, not all at once.
4. **For validation**, run rule checks against `data/severity-matrix.yaml`
   rule IDs. Never block on `warning`/`style` severity — only `error`
   severity should be treated as a hard failure (broken rendering/interop).
5. **For conversion**, use the Fountain mapping in
   `references/10-fountain-mapping.md` and `scripts/convert-fountain.js` as
   the canonical interchange path; use `.fdx` only as a documented factual
   export target (see `REFERENCES.md` — no third-party code was used).
6. **When uncertain about a non-US profile's numeric specs**, say so and
   point to the `verified: false` / `TODO-VERIFY` marker rather than
   presenting an invented number as canonical.

## Usage examples

- "Check if my scene headings are in the right format" → `skill-screenplay-validate`, US studio profile, rule IDs `SH-*`.
- "This is a half-hour sitcom script, format it multicam style" → `skill-screenplay-format`, `profiles/us-tv-multicam.yaml`.
- "Turn this plain-text scene into Fountain" → `skill-screenplay-export`, `scripts/convert-fountain.js`.
- "How many minutes is a 108-page drama?" → `skill-screenplay-export`, `scripts/estimate-runtime.js` (≈108 minutes; drama runs slightly longer per page in practice, flag as `style`-level note only).
- "Write like a telenovela, chapter breaks and all" → `skill-screenplay-format`, `profiles/br-telenovela.yaml` (note: partially `TODO-VERIFY`).

## Legal boundary (summary — see LICENSE.md and REFERENCES.md for full text)

Page measurements, element names, and grammar rules are industry-standard
facts/methods and are freely usable. No code, prose, assets, or trademarks
were copied from any third-party screenwriting application or published
style guide. Third-party product names appear only as factual citations in
`REFERENCES.md`, never as branding.

---

Master Scenes Skill by Daniel Rodrigues
