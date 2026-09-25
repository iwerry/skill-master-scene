Master Scenes Skill by Daniel Rodrigues

# 01 — Element Grammar

Master Scene format has exactly nine element types. Every line of a
screenplay is one of these, identified by its left position and case, not
by any markup character (that's what Fountain adds — see
`10-fountain-mapping.md`).

## The elements

| Element | Identifying signal |
|---|---|
| Scene Heading | Starts at 1.5 in, ALL CAPS, begins with a location prefix |
| Action | Starts at 1.5 in, mixed case, 3rd person present tense |
| Character | Starts at ~3.7 in, ALL CAPS, no trailing punctuation except extensions |
| Parenthetical | Starts at ~3.1 in, wrapped in `(...)`, max 1 line |
| Dialogue | Starts at 2.5 in, mixed case, no quotation marks |
| Transition | Right-aligned at 6.0 in, ALL CAPS, conventionally ends `TO:` |
| Page Number | Top right, format `N.` |
| Scene Number | Both margins, shooting/production modes only |
| Title Page fields | Separate page, not part of the body grammar |

## Scene heading grammar

```
INT./EXT. LOCATION NAME - TIME OF DAY
```

- Prefix: `INT.`, `EXT.`, `EST.`, `I/E.`, or `INT/EXT.`
- Location: short and descriptive, e.g. `POLICE STATION`
- Time of day: `DAY`, `NIGHT`, `AFTERNOON`, `LATER`, `SAME`,
  `MOMENTS LATER`, or a flashback tag like `FLASHBACK (1944)`
- `SAME` means the action is simultaneous with the previous scene; such
  scenes can be written as one continuous flow without cutting away, e.g.
  `INT. BAR – SAME`.
- Everything in the heading is ALL CAPS.

## Content rules by element

- **Action** — third person, present tense, describes only what a camera
  could see or a microphone could hear. Paragraphs longer than 4 lines are
  a *style* flag, not an error — long action is a pacing choice, not a
  format violation.
- **Character** — always ALL CAPS. May carry an extension: `(V.O.)`,
  `(O.S.)`, `(CONT'D)`.
- **Dialogue** — never wrapped in quotation marks.
- **Parenthetical** — one line max, reserved for a brief physical action
  attached to the speech (e.g. `(picking up the phone)`), not for emotion
  or acting direction (a "wryly," e.g. `(sarcastically)`), which is
  considered a style anti-pattern because it tells actors how to perform
  rather than what happens.
- **Transitions** — `FADE IN:`, `FADE OUT.`, `CUT TO:`, `SMASH CUT TO:`,
  `CUT TO BLACK.` `FREEZE FRAME` takes no colon and no action described
  after it — it is the last thing on the page/scene.

## Why this rule exists

The element grammar exists so that a screenplay can be read purely by
column position and case — no markup needed. This is what lets a reader
(or a script supervisor, or a piece of software) identify every element
type from a plain monospaced page, and is the entire reason Fountain's
"one-character override" syntax works: it's shorthand for exactly these
positional cues.

---

Master Scenes Skill by Daniel Rodrigues
