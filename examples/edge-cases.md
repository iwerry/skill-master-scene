Master Scenes Skill by Daniel Rodrigues

# Edge Cases

This file is part of the acceptance test set. Running
`scripts/validate-format.js` and `scripts/lint-style.js` against the
`.fountain` files in this directory should produce the findings listed
below — that agreement is what "the package is correct" means for
`examples/`, per Part E of the master brief.

## `golden-page.fountain`
The reference page. Expected: **no `error`-severity findings.** This is
the acceptance test for correct formatting — scene headings ALL CAPS with
prefix + time-of-day, character cues ALL CAPS, no quotation marks in
dialogue, a `(CONT'D)` extension used correctly, `SAME` used correctly for
a simultaneous cut, `FADE IN:`/`FADE OUT.`/`CUT TO:` used correctly.

## `dual-dialogue.fountain`
Demonstrates the `^` dual-dialogue marker on the second character block.
Expected: `convert-fountain.js` should parse `CARL ^` as `{ type:
"character", text: "CARL", dual: true }`.

## `montage-intercut.fountain`
Demonstrates `MONTAGE` and `INTERCUT` as scene-heading suffixes/variants,
and `LATER` as a time-of-day value. Expected: no `error`-severity
findings; these are recognized, standard scene-heading time-of-day
patterns.

## `more-contd.fountain`
Demonstrates a long dialogue block split across a page with `(MORE)` and
`(CONT'D)`. Expected: no findings above `info` severity — this is the
documented, optional, correctly-executed split-dialogue convention
(`DIAL-MORE-001` should NOT fire here, since the markers are present).

## Additional edge cases to reason about (not separate files)

- **Cold Open**: a scene before the title/credits sequence, before any
  act-one slug. Structural, not a distinct element type.
- **Act Break**: `END OF ACT ONE` as an ALL CAPS slug — treat like a
  transition for column/case purposes.
- **Title Page**: separate from body grammar entirely — title, credit,
  author, and draft date fields, centered, on their own page. Not subject
  to the 55-lines-per-page body rule.

---

Master Scenes Skill by Daniel Rodrigues
