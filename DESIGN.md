# Design

> Visual system for the `/quiz` funnel. Scope note: the rest of the site (v5/index) keeps its
> own light "wine on cream" system; the quiz is a deliberately distinct **atelier-at-night**
> surface that hands off to it. Format follows the Google Stitch DESIGN.md convention.

## Theme
Atelier at night. A drenched, deep-bordeaux surface lit by a warm lamp glow, parchment type,
and two craft accents — coral thread and brass. Immersive and premium, but warm and welcoming,
not cold luxury. The dark→light shift into the sales page reads as "opening the shop."

- **Register:** brand (campaign / conversion funnel).
- **Color strategy:** Drenched + Full palette — the bordeaux surface *is* the brand; coral and
  brass each carry a deliberate role.
- **Mode rationale:** evening scene (lamp light, deep fabric tones, chalk marks) forces dark.

## Color
OKLCH-designed, warm-tinted (never neutral gray). All text pairs verified ≥4.5:1.

| Token        | Hex       | Role |
|--------------|-----------|------|
| `--bg`       | `#2e1218` | Page drench (deep warm bordeaux-black) |
| `--bg-2`     | `#37161d` | Loading / quieter sections |
| `--surface`  | `#43202a` | Raised panels, options, result panels |
| `--surface-2`| `#512734` | Hover / selected fill |
| `--line`     | `rgba(246,234,224,.14)` | Hairline borders (chalk lines) |
| `--ink`      | `#f6eae0` | Primary text (warm parchment, not white) |
| `--ink-soft` | `#ecd7cc` | Secondary headings |
| `--muted`    | `#d3aaa4` | Muted body / labels (rose-tinted, 8.3:1 on bg) |
| `--coral`    | `#f0714f` | **Primary action**: CTA, progress, selected, archetype |
| `--coral-deep`| `#d65a39` | CTA depth / pressed state |
| `--brass`    | `#e3ad57` | **Reward accent**: XP, sparkle, ring, "recomendado" ribbon |

Rules: no gradient text; accents on dark stay above 4.5:1; gold + bordeaux (not navy + gold).
CTA = solid coral fill with bordeaux-ink label (≈5.9:1).

## Typography
Paired on a contrast axis (organic serif + humanist sans). Both chosen off the reflex-reject
list; no Playfair/Cormorant/Inter.

- **Display — Young Serif** (400): headlines, questions, archetype name, the % number. Roman,
  chunky, warm, hand-cut. Letter-spacing -0.01em; `text-wrap: balance`.
- **Body/UI — Hanken Grotesk** (400–800): body, labels, buttons, badges. Warm humanist.
- **Scale:** fluid `clamp()`, ratio ≥1.25. Display max ~42px (narrow 520px column). Body 15–16px,
  line-height 1.65–1.7 (light-on-dark gets extra leading). Measure capped ~36ch in the column.

## Layout & Spacing
- Single centered column, `max-width: 520px`, mobile-first; vertically centered stage.
- Spacing varies for rhythm (tight within groups, generous between). No monotone gaps.
- One decision per screen (start → question → analyzing → result). No card grids; result panels
  are flat siblings, never nested.

## Components
- **Stitch divider** — a short dashed coral/brass "running-seam" flourish (brand motif; replaces
  the banned eyebrow chip and icon tile).
- **Option row** — full-width button: emoji in a soft circular well + label + selection dot;
  hairline border → coral border + tinted fill + filled check when selected. Hover lifts.
- **Progress bar** — `transform: scaleX()` coral fill on a parchment track (no width animation).
- **XP pill** — brass-tinted, the gamified score.
- **Compatibility ring** — SVG stroke-dashoffset dial, Young-Serif number; meaningful result, not
  a SaaS vanity metric.
- **Plan panel** — distinct surface with brass "⭐ Recomendado pra você" ribbon and coral CTA.

## Motion
Intentional, exponential ease-out (`cubic-bezier(.16,1,.3,1)`); no bounce/elastic, no animated
layout properties. Staggered reveal on the result (each line fits what it reveals). Warm lamp
glow is static atmosphere. Every animation has a `prefers-reduced-motion` crossfade/instant
fallback.

## Iconography
Emoji as a single coherent, friendly set (on-brand for a playful quiz). No large rounded-corner
icon tiles above headings.
