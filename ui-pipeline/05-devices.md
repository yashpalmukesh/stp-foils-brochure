# 05 — Devices

Served at http://localhost:8765 (`python3 -m http.server`). The page was opened in **Responsively App 1.18.0** for side-by-side viewing on multiple devices. Measured with taste-skill `inspect.mjs --widths 1440,1280,768,375` (headless Chrome) and the in-app browser.

| Width | Result | Notes |
|---|---|---|
| 1440 | ✅ pass | Headline 2 lines at 76px. All 7 mosaic swatches visible after the fix (two were cropped off the edge). No overflow |
| 1280 | ✅ pass | Headline 2 lines at 68px. No overflow, equal margins |
| 768 | ✅ fixed → pass | The catalogue had stacked into a ~6,700px column, shortened by keeping the side-by-side family layout down to 641px. The proof canvas now sits above its controls and stays in view |
| 375 | ✅ fixed → pass | Swatches enlarged from 40×58 chips to full-width 88px specimens. Statement leading raised to 1.3. "Shade card" link kept in the header. `scrollWidth` = 375 (no horizontal scroll). No console errors |

**Tap targets:** buttons 52px, radio chips 44px, nav links 44px, footer links padded to 44px, the strip pause button 44px. The only element under 24px is the "Your words" `<label>`, whose real target is its 56px input.
**Reduced motion:** the inspector's reduced-motion pass reports no hidden text. Smooth scroll, the bar slide, the marquee and the parallax all switch off. The proof stamp fades in over 150ms instead of pressing.
**Not covered:** real iOS Safari and Android hardware. Run it on a phone before launch (Emil's `mobile-native` checklist).
