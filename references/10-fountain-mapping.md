Master Scenes Skill by Daniel Rodrigues

# 10 — Fountain Mapping

[Fountain](https://fountain.io) is an open, plain-text screenwriting
markup created in 2012 by John August and Stu Maschwitz. It is used here
only as the canonical, freely-implementable interchange syntax — see
`LICENSE.md` item 5.

## One-character overrides

Fountain identifies most elements by position/case alone, the same way a
formatted page does, but offers optional one-character prefixes to force
an element type when the plain-text heuristic would be ambiguous:

| Prefix | Forces element |
|---|---|
| `.` | Scene Heading |
| `!` | Action |
| `@` | Character |
| `>` | Transition |

## Process-layer syntax

| Syntax | Meaning |
|---|---|
| `[[note]]` | Note — visible to writer, not rendered in output |
| `/* boneyard */` | Boneyard — block comment, excluded entirely from output |
| `#scene number#` | Explicit scene number override |
| `^` (prefix on a character's second line) | Dual dialogue — pairs with the block above it |
| `_emphasis_` | Underline/emphasis span |

## Mapping to Master Scene elements

| Master Scene element | Fountain representation |
|---|---|
| Scene Heading | Line starting with `INT./EXT./EST./...`, or forced with `.` |
| Action | Any plain paragraph, or forced with `!` |
| Character | ALL CAPS line with no trailing text before dialogue, or forced with `@` |
| Dialogue | Any line immediately following a Character line |
| Parenthetical | A line wrapped in `(...)` immediately after a Character or within Dialogue |
| Transition | ALL CAPS line ending in `TO:`, or forced with `>` |
| Dual Dialogue | Second Character block marked with a trailing `^` |
| Scene Number | `#N#` at the end of a scene heading line |

`convert-fountain.js` implements this mapping in both directions using
only this documented syntax — no code was read from, or adapted out of,
any third-party Fountain parser implementation.

## `.fdx` as an export target

Final Draft XML (`.fdx`) is referenced only as a factual target schema
(an XML document with `Paragraph` elements carrying a `Type` attribute
matching these same element names). `convert-fountain.js` does not
currently implement `.fdx` export in v1.0.0 — this is a documented future
extension point for `skill-screenplay-export`, to be implemented from the
observed XML structure only, never from another tool's converter code.

## Why this rule exists

Fountain exists specifically so plain text can carry full screenplay
structure without proprietary binary formats — using it as this
package's canonical interchange keeps every script this skill touches
portable, diffable in version control, and legally unencumbered.

---

Master Scenes Skill by Daniel Rodrigues
