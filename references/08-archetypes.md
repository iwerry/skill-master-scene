Master Scenes Skill by Daniel Rodrigues

# 08 — Writer / Director Archetypes

Archetypes are *behavioral* profiles layered on top of a cultural/industry
profile — they change tone and tolerance, not the underlying page geometry
(unless a specific archetype explicitly overrides it, as noted).

Each archetype defines: `tone`, `tolerance_level`, `default_extensions`,
`allowed_violations`, `recommended_warnings`.

## 1. Classic Spec Writer
- `tone`: clean, restrained, third-person-strict.
- `tolerance_level`: low (format purist).
- `default_extensions`: `(V.O.)`, `(O.S.)` only.
- `allowed_violations`: none beyond `style` severity.
- `recommended_warnings`: flag `WE SEE`/`WE PAN`, flag wrylies aggressively.

## 2. Writer-Director (Auteur)
- `tone`: camera-aware, may use first person in action ("we push in on...").
- `tolerance_level`: high — often writes shooting-script style from the
  first draft (e.g. the publicly discussed style of Christopher Nolan's
  *Oppenheimer* screenplay, referenced here only as a factual, publicly
  known example of a real-world archetype, not reproduced from it).
- `default_extensions`: heavy use of parentheticals as staging notes.
- `allowed_violations`: first-person action lines, camera directions
  inline (`allowed_violations` at `style`, never `error`).
- `recommended_warnings`: flag when action reads more like a shot list
  than a scene, in case the writer wants to soften it for a spec read.

## 3. Showrunner / TV Writer
- `tone`: structured around act breaks and returning story engines.
- `tolerance_level`: medium.
- `default_extensions`: A/B/C story tags, teaser/act labels.
- `allowed_violations`: act-break slugs (`END OF ACT ONE`), multicam vs.
  single-cam layout differences (see `profiles/us-tv-*`).
- `recommended_warnings`: flag missing act breaks in a one-hour drama.

## 4. Animation Writer
- `tone`: playful, allows physically impossible action.
- `tolerance_level`: high on content, low on shot/camera-note format.
- `default_extensions`: shot/camera notes inline, tighter scene description.
- `allowed_violations`: exaggerated or impossible physicality in action
  lines (never flagged as a content error — animation is not live-action).
- `recommended_warnings`: flag overly long action blocks, since animation
  pages often run denser per page than live-action.

## 5. Commercial / Branded Content Writer
- `tone`: compact, sales-oriented.
- `tolerance_level`: high — the 90–120 page runtime model does not apply.
- `default_extensions`: dual-column AV format slots (VIDEO | AUDIO).
- `allowed_violations`: 30s/60s short forms, non-standard page geometry
  for the AV-column layout.
- `recommended_warnings`: flag if a US-studio spec runtime rule
  (`RUNTIME-*`) is applied by mistake to a commercial script.

## 6. Audio Drama Writer
- `tone`: sound-first, no visual camera language.
- `tolerance_level`: high on visual-format rules (they mostly don't apply).
- `default_extensions`: VO and SFX as first-class elements, not extensions.
- `allowed_violations`: no scene headings in the visual `INT./EXT.` sense —
  use location/ambience cues instead.
- `recommended_warnings`: flag any camera-language leaking into an audio
  drama draft (`CUT TO:`, `WE SEE`) as a mismatched-medium note.

## Why this rule exists

The Master Scene grammar is a floor, not a ceiling — real working writers
and directors deviate from strict spec convention constantly, and those
deviations are consistent enough to name and tolerate rather than flag as
errors every time. Modeling archetypes lets the validator distinguish
"this writer made a deliberate, recognizable choice" from "this script is
broken."

---

Master Scenes Skill by Daniel Rodrigues
