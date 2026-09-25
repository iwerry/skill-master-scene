Master Scenes Skill by Daniel Rodrigues

# Changelog

All notable changes to `skill-master-scene` are documented here.
This package follows [Semantic Versioning](https://semver.org/).

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
