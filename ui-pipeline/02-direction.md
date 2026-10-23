# 02 — Direction (taste-skill)

**Dealt:** `specimen-catalogue` — "The specimen catalogue" · seed 1354184451 · sector physical-product · `--keep palette,type`.
Options dealt: hero-object, **specimen-catalogue**, name-as-monument.
**Why this one:** a converter chooses foil from a *shade card*, which is a real artefact of STP's trade. A catalogue that shows every foil as a photographed specimen, at the same scale and plainly named, is that shade card made into a page. *hero-object* would just repeat the old cover, and *name-as-monument* would put the wordmark ahead of the product.

## Inventory (what only STP has)

1. Founded as **Sha Tarachand Parasmal** in **1956**, selling bronze powder before foils.
2. Moved into stamping foils in **1982**, and incorporated as **STP Foils LLP in 2019**.
3. **Old No.147 / New No.219, Sydenhams Road, opposite Nehru Indoor Stadium, Chennai 600003.**
4. The **8-point red star** with the joined STP letterform.
5. The reel band label: *Stamp Excellence · Trusted quality · Smooth transfer · Luxury finish*.
6. Every batch is checked against a **retained master** before it ships.
7. Die temperature: **90–120°C**.
8. Five families, **26 named shades** across metallic, pigment, holographic, flexo and digital.
9. Its partners: printers, converters, label makers, wedding-card producers and distilleries.
10. The promise: "the roll ordered today behaves like the roll ordered last season".
11. Sister brand **Z Foil**, "Smart finishing solutions".
12. Two phone lines: 93800 99099 and 73580 50800.

## The idea

> On this page, **STP's shade card, the 26 real foil swatches photographed from its own reels**, becomes **the specimen catalogue: every foil alone on a flat field, the same scale, named plainly, with what it's for.**

**Competitor test:** another foil trader could make a catalogue, but not of these 26 swatches, with these names, checked against a retained master. The swatch photos are STP's own.

**The live thing: "Stamp a proof."** The visitor types a word (their brand name, a guest's name), picks one of STP's real foils and a substrate (black carton, ivory card or kraft), and the page "presses" it: the word is stamped in that foil's own photographed texture. It runs on a canvas, works with a thumb on a phone, and without script shows a still photograph of real foil work.

## Composition (adopted from the sheet)

| Section | Blueprint | Content |
|---|---|---|
| Hero | Statement beside specimen mosaic | h1 "Stamping foils, since 1956". Supporting line, one action (Request samples on WhatsApp). On the right, a 50% darker-ivory field holding a mosaic of 7 swatch tiles rotating white / charcoal / red / ivory. |
| Intro | Statement with inline thumbnails | One sentence of 30px or less. Inline frames show bronze powder → reel → shade → press. |
| About | **Redrawn:** no team portraits exist, so "Team on colour tiles" can't be done honestly | The family story, with the factory photo and the six reasons customers stay as a two-column text list. |
| Showcase | Two objects, two fields | **Hot stamping** (metallic reels on ivory) next to **Cold stamping** (flexo reels on charcoal). |
| List | Two-column menu, photo bullets | **The catalogue.** Five families, each with a count, and each shade with its swatch as the bullet, a one-line use, and what it's "perfect for". |
| Live thing | (inside the catalogue's close) | Stamp a proof. |
| How it works | Tiles that grow | Sourced → Inspected → Slit → Dispatched, in four tiles of growing height. |
| Proof | The printed guest list | "Where our foil ends up": the real application list (wedding stationery · wine & spirits labels · pharma cartons …). No invented clients. |
| Contact | Photo strip, three-cell bar | A red field with a drifting strip of the client's photos. Three filled cells: Call · WhatsApp · Email. (No form backend, so actions, not inputs.) |
| Footer | The back of the card | A scalloped ivory card: sign-off, the address lines and the star as the stamp. Both brands. |

## Type and palette (brand kept)

- **Montserrat only.** Five steps: display clamp(44px, 6vw, 88px) / heading clamp(28px, 3.2vw, 44px) / lead 20px / body 17px / small 14px. Weights 800 display, 600 headings, 500 body.
- **Ground** Ivory #F7F6F2 · **field step** #ECE9E1 · **ink** Charcoal #1E1E1E · **paper** White · **accent** STP Red #D41B18, used on the action, the star and the contact field.
- Tile rotation: white → #ECE9E1 → charcoal → red.

## Motion

- **Signature:** shutter image. The hero mosaic tiles open from the bottom edge with a clip-path while each swatch settles from 1.12 scale, staggered.
- Section entrances: heading → text → picture, staggered 70ms, rising 24px.
- Feedback on every control. One moving picture: the contact strip marquee.
- The live thing's press. All of it drops to static under `prefers-reduced-motion`.

## Deliberately not taken from 01-inspiration

- The bracketed `[05]` page bar and page numbers, because taste-skill bans index numbering. Brochure order is kept through the order of the sections.
- The "press as loader" intro, because the house rules forbid any gate before the title.
- Neutomni's rising columns live on as *tiles that grow*.

## Brand exceptions to the house rules (pass `--allow`)

- `palette-cream`: Ivory #F7F6F2 is the brand ground in the guidelines.
- `default-font`: Montserrat is the brand typeface.
- The logo lockup's letter-spaced tagline "PRECISION IN EVERY FINISH" is part of the logo artwork, not a label.
