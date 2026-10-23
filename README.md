# STP Foils — Animated Brochure

An animated web edition of the **STP Foils "Stamp Excellence"** brochure. It's a static site with no build step, set in Montserrat with the STP Red / Charcoal / Ivory palette from the brand guidelines.

**Pages:** Cover · Contents · Our Story · Product Range · Metallic · Pigment · Holographic · Flexo Cold · Digital · Heat-Pressure-Transfer · Inside STP Foils · Why STP Foils · Contact

## Run locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## Edit

- `index.html`: all brochure copy
- `assets/style.css`: brand tokens at the top (`--red`, `--charcoal`, `--ivory`)
- `assets/main.js`: scroll reveals, counters, holographic pointer effect, arrow-key page turning
- `assets/img/`: photography taken from the print brochure

Animations respect the visitor's *reduce motion* setting.

© STP Foils LLP, Chennai
