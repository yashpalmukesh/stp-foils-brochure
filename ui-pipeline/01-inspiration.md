# 01 — Inspiration (Awwwards)

**Brief:** polish the STP Foils animated brochure. The mood is premium, precise and crafted, with metallic sheen and a stamping/press metaphor, and it must still read as a 12-page brochure.
**Fixed:** STP Red #D41B18 · Charcoal #1E1E1E · Ivory #F7F6F2 · White · Montserrat.

**How the research ran:** The Awwwards server was called directly (`awwwards-mcp@1.11.0`), because its tools weren't loaded in this session. Searches used `luxury`, the colour `#B42625` with SOTD, and `#F3F2F2` with `storytelling`. Words like "packaging", "print" and "industrial" returned nothing from the live index. The synthesis came from `create_design_brief` on the 5 sites below. Motion came from element videos, cut into 12-frame contact sheets (AVFoundation stood in for ffmpeg).

## References

| Site | Award | Why it's relevant | What I studied |
|---|---|---|---|
| **Neutomni** — neutomni.com | SOTD + Developer | Red-and-white studio with a near-identical red (#CF1830), confident and graphic | Loader video, process video |
| **GoShuin — Every stamp, a memory** — aestudio.studio/goshuin | Nominee | *A page-turning journal about stamps*: ivory paper, "Page 01 / 13" bar with Previous/Next, "Replay the ink" | Hero screenshot |
| **Prägen Hätlen** — pragenhatlen.com | Nominee | Precision craft (watches; *prägen* means "to emboss"). Bracketed `[01]` nav, a line drawing of the product that resolves into full-bleed craft footage | Loader video |
| **ESR Bespoke** — esrbespoke.au | SOTD + Developer | Luxury manufacturing: one bold wordmark on black, with tiny technical labels around it | Hero screenshot |
| **Cartier — Le Chœur des Pierres** | SOTD + Developer | Luxury craft storytelling with an animated content scroll and "gouaché reveal" | Brief data only (no motion cached) |

## What the motion showed (from the frames)

- **Neutomni loader:** a red field with a hairline progress line. The wordmark rises into place letter by letter from behind a mask at the top edge. Then a white band opens out of the line, wiping the red away to reveal the page. It's one continuous gesture, with no fade.
- **Neutomni process:** four red columns rise from the baseline to staggered heights, like a bar chart. A thin outline shape morphs from a pentagon into a circle as it travels across them, then each column completes to full height in turn.
- **Prägen Hätlen loader:** a blueprint-style line drawing of the watch sits on a soft gradient while the nav labels type in, then cuts to full-bleed close-ups of the craft with a centred uppercase headline.

## 3 moves to borrow (the move, not the look)

1. **The press as the intro.** A loader that *stamps*: the STP star presses into a red field along a hairline (borrowed from Neutomni's line and mask rise), then the field splits open on that line to reveal the cover. It tells "heat, pressure, transfer" before a word is read.
2. **The brochure as a paged object.** A persistent page bar like GoShuin's: `Page 05 / 12 · Metallic Foils`, with Previous/Next buttons. Section labels use the bracketed `[05]` from Prägen Hätlen. It keeps the 12-page brochure identity on the web.
3. **The process as rising columns.** Inside STP Foils (Sourcing → Dispatch) becomes five red columns rising to staggered heights, one completing per step, as in Neutomni's process. It replaces a generic dots-on-a-line timeline with something that has weight.

**Not borrowing:** Neutomni's serif-italic pairing (Montserrat only), Prägen's slate-blue palette, or WebGL. The site stays a static, vanilla JS page.
