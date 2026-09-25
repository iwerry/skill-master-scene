Master Scenes Skill by Daniel Rodrigues

# 03 — Page-Break Rules

## The rules

1. **Scene headings are never orphaned.** A scene heading must never be the
   last line on a page with no action following it — it stays bound to the
   action block that follows. (`SH-ORPHAN-001`, severity `error`.)
2. **Single-line dialogue is pushed to the next page.** If a character's
   entire dialogue block is only one line, it is moved in full to the next
   page rather than split. (`DIAL-002`, severity `warning`.)
3. **Long dialogue may be split across pages.** When it is, the convention
   is to add `(MORE)` at the bottom of the page and `(CONT'D)` after the
   character's name at the top of the next page. This behavior is
   **optional and configurable** per profile/mode — some production
   pipelines disable it entirely. (`DIAL-MORE-001`, severity `info` when
   absent — never an error.)

## Why this rule exists

These rules exist to preserve reading flow for actors and crew glancing at
a page mid-scene. An orphaned heading with no action underneath forces the
reader to flip the page not knowing what's about to happen; a single line
of dialogue stranded at the top of a new page reads as disconnected from
its setup. The `(MORE)`/`(CONT'D)` convention exists so a reader flipping
pages mid-speech knows immediately that the same character is still
talking, without re-reading the character cue as if it were a new line.

---

Master Scenes Skill by Daniel Rodrigues
