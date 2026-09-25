Master Scenes Skill by Daniel Rodrigues

# 06 — Spec vs. Shooting (and other modes)

| Mode | Purpose | Scene numbers | Strictness |
|---|---|---|---|
| `spec` | Selling / reading draft | No | Warn on style issues |
| `shooting` | Production draft | Yes | Tolerant; `(MORE)`/`(CONT'D)` enabled |
| `production` | Call sheets, strips, reports | Yes | Bold/italics allowed |
| `table-read` | Rehearsal (hide one character's lines) | Optional | Filter mode |

## Choosing a mode

- Default to `spec` unless the user says "shooting script," "production
  draft," "with scene numbers," or names a production-facing document
  (call sheet, one-liner, strip board).
- `table-read` mode doesn't change the underlying format — it's a
  *view/filter* over an existing script (e.g. hiding a character's lines
  for cold-reading practice), so it should be implemented as a
  presentation transform, not a new grammar.

## Why this rule exists

A spec script is meant to sell a story on the page — it stays clean of
scene numbers and continuity markers that only matter once a production is
actually breaking the script into shoot days. A shooting script is a
working document handed to dozens of department heads who need stable
scene numbers to reference across schedules, budgets, and call sheets;
changing a scene number mid-production is a real logistical cost, so
shooting scripts tolerate more visual clutter in exchange for that
stability.

---

Master Scenes Skill by Daniel Rodrigues
