Master Scenes Skill by Daniel Rodrigues

# 07 — Canonical English Terminology

Canonical terms live in `data/terminology.yaml` with English as the only
key code ever branches on. This file is the human-readable index; do not
translate the term names themselves when writing code or rule IDs — only
their display labels are localized.

## Canonical term list

Scene Heading (Slugline), Action, Character, Dialogue, Parenthetical
(Wryly), Transition, Extension, V.O. (Voice Over), O.S. / O.C. (Off Screen
/ Off Camera), CONT'D, MORE, Dual Dialogue, Beat, Montage, Intercut,
Series of Shots, Flashback, Cold Open, Teaser, Act Break, Title Page,
Scene Number, Boneyard, Note, Sequence, Card, Outline, Treatment,
One-Liner, Step Outline.

## Why this rule exists

Screenwriting is practiced worldwide, but the vocabulary that describes
the format is English by industry convention — even scripts written
entirely in Portuguese, Japanese, or French still say `INT.`/`EXT.`,
`V.O.`, `CONT'D`, and `CUT TO:` in English. Encoding English as the fixed
key set (with other languages as display-only labels) mirrors how the
industry actually writes, and avoids a class of bugs where a localized
label silently becomes a second, inconsistent source of truth for a rule
engine.

---

Master Scenes Skill by Daniel Rodrigues
