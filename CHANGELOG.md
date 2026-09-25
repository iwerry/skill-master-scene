Master Scenes Skill by Daniel Rodrigues

# Changelog

All notable changes to `skill-master-scene` are documented here.
This package follows [Semantic Versioning](https://semver.org/).

## [1.1.0]

### Fixed
- `format-profile.yaml` — removed a stray duplicate quote in
  `font.family.allowed_values` that broke YAML parsing
  (`["Courier", "Courier Prime""]` → `["Courier", "Courier Prime"]`).

### Added
- `scripts/validate-format.js` now also implements `SH-002`,
  `TRANS-001`, `FREEZE-001`, `PAREN-001`, `PAREN-002`, and
  `SCENE-NUM-001` from `data/severity-matrix.yaml` (previously
  documented but not checked in code).
- `package.json` — minimal manifest (`type: module`, Node ≥18,
  `npm test` entry point).
- `scripts/run-examples.js` — acceptance-test runner that checks the
  `.fountain` files in `examples/` against the expectations written in
  `examples/edge-cases.md`, per Part E of the original brief.
- `README.md` — full project overview, module index, usage example,
  and profile/severity tables.

### Known scope limits (documented, not bugs)
- `CHAR-002` (character-cue physical column position) and
  `DIAL-MORE-001` (MORE/CONT'D missing across a real page break) remain
  unimplemented in `validate-format.js` — both require a laid-out or
  paginated representation that plain text does not carry. See the
  scope note at the top of `scripts/validate-format.js`.

## [1.0.0] — Initial release

### Added
- `SKILL.md` contract with 3-module index (`format`, `validate`, `export`).
- `LICENSE.md` with full authorship and legal-boundary text.
- `REFERENCES.md` factual citation list.
- `format-profile.yaml` — fully populated canonical schema (font, page,
  margins, elements, page_breaks, runtime, modes, tolerances).
- Nine cultural/industry profiles under `profiles/`; `us-studio-feature`
  fully verified, remaining eight scaffolded with `verified: false` and
  `TODO-VERIFY` markers where numeric specifics are uncertain.
- Ten topic references under `references/` (element grammar through
  Fountain mapping), each with a "Why this rule exists" subsection.
- `data/element-coordinates.yaml`, `data/terminology.yaml`,
  `data/severity-matrix.yaml`.
- Four dependency-free ES module scripts under `scripts/`:
  `validate-format.js`, `estimate-runtime.js`, `convert-fountain.js`,
  `lint-style.js`.
- `examples/golden-page.fountain` acceptance-test page plus dual dialogue,
  montage/intercut, and MORE/CONT'D examples, and `edge-cases.md`.

---

Master Scenes Skill by Daniel Rodrigues
