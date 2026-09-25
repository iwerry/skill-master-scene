Master Scenes Skill by Daniel Rodrigues

# 09 — Cultural / Industry Profiles

Nine profile stubs live in `profiles/*.yaml`, each inheriting from
`format-profile.yaml` and overriding only the deltas. Every profile
carries a `verified: true|false` flag.

| Profile file | Market/medium | Verified |
|---|---|---|
| `us-studio-feature.yaml` | US feature film, the reference standard | true |
| `us-tv-single-cam.yaml` | US one-hour single-camera drama | partial |
| `us-tv-multicam.yaml` | US half-hour multi-camera sitcom | partial |
| `uk-bbc.yaml` | British television | false |
| `br-telenovela.yaml` | Brazilian chapter-based telenovela | false |
| `in-masala.yaml` | Indian multi-act, song-break structure | false |
| `jp-anime.yaml` | Japanese anime, cut-numbered scripting | false |
| `audio-drama.yaml` | Medium-agnostic audio drama | partial |
| `graphic-novel-comic.yaml` | Comics/graphic novel panel scripting | partial |

Only `us-studio-feature` is treated as canonical fact — it is Part A of
this package's ground truth. Every other profile contains at least one
`TODO-VERIFY` field where a specific numeric convention (margin, page
count target, etc.) is genuinely uncertain or varies by broadcaster/studio
house style. Never present a `TODO-VERIFY` value as settled fact to a
user; say plainly that it's unverified and point them to the field.

## Why this rule exists

Presenting an invented number as canonical is worse than admitting
uncertainty — a writer who trusts a wrong margin number for, say, BBC
house style could submit a script that gets bounced by a script
coordinator for a completely avoidable formatting reason. Marking
uncertainty explicitly protects the user from that failure mode while
still letting the skill be useful for the parts that genuinely are
well-established (e.g. telenovela chapter/act structure being a widely
known convention even where exact page-margin numbers vary by network).

---

Master Scenes Skill by Daniel Rodrigues
