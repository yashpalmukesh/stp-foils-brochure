# 04 — Audit & polish

Taste-skill gate before polishing: `inspect.mjs` reported **0 FAIL** at 1440 / 768 / 390, with 1 WARN (no footage: no honestly licensed foil-stamping clip exists in the open collections). Before the rebuild it was **15 FAIL, 6 WARN**, and lint went from **102 FAIL to 0**.

The audits ran in parallel as read-only subagents. Every fix below was applied by the main session.

## Motion: Emil Kowalski skills (`find-animation-opportunities`, `animation-performance`)

`review-animations` can't be started by a subagent; run `/review-animations` by hand for a second opinion.

| # | Sev | Finding | Fix applied |
|---|---|---|---|
| 1 | High | The showcase parallax ran on the main thread, read and wrote layout in the same loop, and fought an 80ms transition | CSS scroll-driven `view-timeline` (off the main thread). The JS fallback only runs where that isn't supported, does all reads before writes, and only touches visible panels |
| 2 | High | Shade lists rose twice, as a child of `.family` and on their own (48px of travel) | The list itself is static; its rows still stagger |
| 3 | High | Hero shutter used ease-in-out and took 2.16s to settle | Now ease-out, 800ms clip / 1100ms settle, 60ms stagger, settled by about 1.5s |
| 4 | High | `.js` class added at the end of body, so the hero could flash before the shutter | Inline `<script>` in `<head>` adds `.js` before first paint |
| 5 | Med-High | The press blurred the full canvas every frame, and the paper grain was generated on first use | The bite is baked once per render, and the grain is pre-warmed in `requestIdleCallback` |
| 6 | Medium | The press read as a crossfade, with two clocks out of step | One WAAPI clock: the die comes down (140ms), the foil appears on contact, the die lifts. Under reduced motion the stamp fades in over 150ms |
| 7 | Medium | Marquee jumped 4px every loop, and 24 strip images loaded eagerly | `padding-right: 8px` makes −50% exactly one period; the strip images now load lazily; hover-pause only on fine pointers |
| 8 | Medium | Smooth scroll ignored reduced motion | Smooth scroll now only applies under `no-preference` |
| 9 | Medium | The bar flickered on scroll jitter, hid keyboard focus, and slid under reduced motion | 8px threshold, `.bar:focus-within` keeps it visible, opacity-only under reduced motion |
| 10 | Low-Med | Some hovers weren't gated for touch, and the bar CTA had no press state | Hovers sit behind `(hover: hover) and (pointer: fine)`; `.bar-action:active` scales to 0.97 |
| 11 | Low | Reduced-motion preference was read only once | Now follows the `matchMedia` change event |
| — | Remove | Shade swatch hover tilt (decorative, on content people read to compare) | Removed |

## Design: Impeccable (audit + detect)

| # | Sev | Finding | Fix applied |
|---|---|---|---|
| 1 | High | **The footer scallops never rendered**, and the bottom 50px (the imprint line) was masked off | Rebuilt the mask: scallop row plus body layer, `-webkit-mask: none` |
| 2 | High | On phone and tablet the proof canvas sat off-screen while you used the controls | ≤1080px: canvas first and sticky, controls below it |
| 3 | High | The hero mosaic hid 2 of its 7 swatches past the viewport edge | Mosaic fills the field inside equal margins |
| 4 | Medium | The proof's dark swatch band blacked out whole letters | Swatch turned 90° and laid across the word, so the highlights run along every letter |
| 5 | Medium | Showcase captions sat flush against the edge of their band | Full-bleed band with the text inset |
| 6 | Medium | "Your words" label sat closer to the block above than to its field | Label and input grouped (`.field`, gap 8px) |
| 7 | Medium | The input started filled with "Your Brand" | Empty with placeholder, `enterkeyhint="done"` |
| 8 | Medium | Screen readers didn't hear the stamp | `aria-live` caption; the canvas `aria-label` names the stamped word, foil and stock |
| 9 | Medium | Contact footnote at 4.49:1 | Full opacity, now 5.29:1 |
| 10 | Medium | 415px gap between the headline and its call to action | Hero copy centred as one group |
| 11 | Medium | Phone swatches shrank to 40×58 chips | Full-width 88px specimens, two per row |
| 12–15 | Low | Marquee couldn't be paused on touch; intro thumbnails too small; tight phone leading; phone nav lost the shade card | Pause button; 2em × 1.1em thumbnails; leading 1.3; "Shade card" stays visible |

## Accessibility: ECC `accessibility` (WCAG 2.2 AA, plus axe-core 4.10.2: 0 violations)

| # | Sev | Finding | Fix applied |
|---|---|---|---|
| 1 | High | Red focus ring invisible on the red contact and footer fields (1.0:1) | White focus ring inside `.contact`, `.guestlist` and `.back` |
| 2 | High | Hide-on-scroll bar could cover focused elements (2.4.11) | Bar never hides while it holds focus; a `focusin` handler scrolls focused elements clear of it |
| 3 | Medium | Proof changes not announced (4.1.3) | Live region plus a dynamic `aria-label` |
| 4 | Medium | Endless marquee with no keyboard or touch pause (2.2.2) | A real "Pause the photo strip" button (`aria-pressed`) |
| 5 | Medium | Input and chips had no visible boundary (1.21:1) | 1px #7d7a73 border on form controls (3.53:1); a defended exception to the no-outline rule |
| 7 | Low-Med | Reduced motion only partly honoured | Global reduced-motion safety net |
| 8–12 | Low | `aria-label` on a plain div; 22px nav targets; decorative stamp alt; new-tab links unannounced; 14 region landmarks | Label moved to the list; 44px nav targets; `alt=""`; "(opens in a new tab)" text; minor sections unlabelled |

Contrast, measured: body #1E1E1E on ivory 15.42:1 · soft ink #4a4844 on ivory/field/white 8.44 / 7.52 / 9.12 · white on STP red 5.29 · white on #b3140f 6.95 · #cfccc4 on charcoal 10.39.

## SEO: ECC `seo`

| # | Sev | Finding | Status |
|---|---|---|---|
| 1 | High | Canonical pointed at www.stpfoils.com from a GitHub Pages copy | **Removed until the deploy URL is decided** (see report) |
| 2 | High | Relative `og:image`, wrong crop, and missing OG/Twitter tags | New 1200×630 `og.jpg`; site_name, locale, image size and alt, Twitter title, description and image. *Absolute URLs are set at deploy* |
| 3 | High | Strip photos loaded eagerly; a 295KB image used as a 26px thumbnail | Strip and thumbnails lazy-loaded; new 160px `thumb-range.jpg` |
| 4 | Medium | LCP swatch not prioritised | `<link rel=preload fetchpriority=high>` plus `fetchpriority` on the img |
| 5 | Medium | Thin JSON-LD | Organization + LocalBusiness with @id, legalName, alternateName, 512px logo, description, address, hasMap, contactPoint and sameAs (zfoil.in). *Opening hours, geo and social profiles left out because they're unconfirmed* |
| 7–8 | Medium | Description 192 characters; title led with the brand | 151-character description; "Hot & Cold Stamping Foils Supplier, Chennai \| STP Foils" |
| 11–12 | Low | Showcase H2 inside the first article; no touch icon | H2 moved above both panels; `apple-touch-icon` |
| 6, 9, 10 | — | robots.txt and sitemap, AVIF `srcset`, self-hosted fonts | **Deferred:** these depend on the final host, and there's no AVIF encoder on this machine |

**Gate after polish:** lint 0 FAIL · inspect 0 FAIL at 1440 / 1280 / 768 / 375 · 1 WARN (no footage, defended).
