Master Scenes Skill by Daniel Rodrigues

# 02 — Page Geometry

## The numbers

| Parameter | Standard value | Tolerance |
|---|---|---|
| Font | Courier / Courier Prime | Monospaced only — error if not |
| Font size | 12 pt | Fixed |
| Pitch | 10 cpi | Fixed |
| Left margin | 1.5 in | Fixed (anchor for all columns) |
| Right margin | 1.0 in | 0.5–1.25 in |
| Top margin to body | 1.0 in | 0.75–1.25 in |
| Page number from top | 0.5 in | Fixed |
| Bottom margin | 0.5–1.5 in | Varies with page break |
| Lines per page | 55 | 45–65 safe range |
| Paper | US Letter (8.5×11 in) | A4 allowed as a variant |
| Runtime ratio | 1 page ≈ 1 minute | — |

## The one true invariant

**Lines per page (55), not any millimeter measurement, is the invariant.**
Every margin value above exists in service of hitting 55 lines on a US
Letter page in 12pt Courier at 10 cpi. If you change paper size (e.g. to
A4) or font, you must re-derive margins to preserve 55 lines/page — you
must NOT simply reuse the US Letter margins on A4 paper and call it
correct, because the two will drift apart in page count and therefore in
runtime estimate.

## Why this rule exists

Courier at 12pt/10cpi on a US Letter page with these exact margins was
chosen decades ago specifically because it produces close to one page of
script per one minute of screen time for average dialogue pacing — this
is the load-bearing convention the entire industry still times, budgets,
and schedules against. The 1.5 in left margin specifically exists to leave
room for a 3-hole punch and brass brads, since scripts are still
physically bound on set.

---

Master Scenes Skill by Daniel Rodrigues
