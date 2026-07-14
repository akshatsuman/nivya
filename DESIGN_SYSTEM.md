
## Colour palette

### Core brand colours

| Token | Hex | Role |
| --- | --- | --- |
| `paper` | `#F7F3EA` | Page background (warm bone) |
| `paper-raised` | `#FCFAF4` | Cards / raised surfaces |
| `paper-deep` | `#EFE8D9` | Deeper section bands, insets |
| `ink` | `#14233B` | Primary text / deep navy |
| `ink-soft` | `#5B6573` | Secondary text |
| `ink-mute` | `#8C8676` | Captions, warm muted labels |
| `evergreen` | `#0F6E5E` | Growth accent / primary CTA |
| `evergreen-deep` | `#0B5749` | CTA hover |
| `teal` | `#1AA08C` | Bright highlight (logo echo) |
| `gold` | `#B4925A` | Brass / premium accent |
| `gold-soft` | `#CBB07E` | Soft brass |
| `line` | `#E7DECC` | Warm hairline on paper |
| `line-strong` | `#DCD1B9` | Stronger borders / rules |

### Background colours (how they are used)

| Surface | Colour / treatment | Where |
| --- | --- | --- |
| Global page | `#F7F3EA` (`bg-paper`) | `body` |
| Page atmosphere | Fixed radial washes: gold `rgba(180,146,90,0.05)` at 18% 12%, evergreen `rgba(15,110,94,0.045)` at 86% 88% | `body` background-image |
| Raised / cards | `#FCFAF4` (`paper-raised`) | Cards, panels |
| Deep bands | `#EFE8D9` (`paper-deep`) | Alternating sections |
| Folio statement | Gradient `#FDFBF6` → `#FBF7EF`, border `#EAE1CF` | `.statement` |
| Text selection | `rgba(15, 110, 94, 0.18)` on `#14233B` text | `::selection` |
| Primary button | `#0F6E5E` → hover `#0B5749`, text `#FCFAF4` | `.btn-primary` |
| Ghost button | Transparent, border `#DCD1B9`, text `#14233B` | `.btn-ghost` |
| Range track | `#E3D8C0` | `input[type="range"]` |
| Range thumb | `#0F6E5E` with `#FCFAF4` ring | slider thumb |
| Evergreen text gradient | `#0F6E5E` → `#1AA08C` | `.text-evergreen-grad` |

### shadcn / CSS variable mapping (`:root`)

These HSL tokens map onto the same light palette:

| CSS variable | HSL | Maps to |
| --- | --- | --- |
| `--background` | `43 39% 94%` | paper |
| `--foreground` | `214 49% 15%` | ink |
| `--card` | `44 50% 97%` | raised paper |
| `--primary` | `167 76% 24%` | evergreen |
| `--secondary` | `214 49% 15%` | ink |
| `--muted` | `43 35% 90%` | muted paper |
| `--muted-foreground` | `215 11% 40%` | soft ink |
| `--accent` | `169 71% 36%` | teal |
| `--destructive` | `0 72% 48%` | error red |
| `--border` / `--input` | `44 39% 85%` | warm line |
| `--ring` | `167 76% 24%` | evergreen |
| `--radius` | `0.7rem` | base radius |

---

## Typography

### Font families

Loaded in `src/main.tsx` via Fontsource.

| Role | Family | Tailwind class | Fallback |
| --- | --- | --- | --- |
| Display / headlines | **Fraunces Variable** (opsz + italic) | `font-display` | Fraunces, Georgia, serif |
| Body / UI | **Hanken Grotesk Variable** | `font-sans` (default on `body`) | Hanken Grotesk, system-ui, sans-serif |
| Data / labels / overlines | **IBM Plex Mono** (400 / 500 / 600) | `font-mono` | ui-monospace, monospace |

Notes from CSS:

- `.font-display` uses `font-optical-sizing: auto`
- `.font-mono` uses tabular nums (`tnum`) for financial figures

### Type scale

| Token | Size | Line height | Letter spacing | Weight |
| --- | --- | --- | --- | --- |
| `display` | 76px | 1.02 | -0.02em | 500 |
| `display-mobile` | 42px | 1.04 | -0.015em | 500 |
| `h1` | 48px | 1.08 | -0.015em | 500 |
| `h1-mobile` | 33px | 1.1 | -0.01em | 500 |
| `h2` | 32px | 1.16 | -0.01em | 500 |
| `h2-mobile` | 25px | 1.18 | -0.005em | 500 |
| `h3` | 23px | 1.3 | — | 500 |
| `h3-mobile` | 20px | 1.3 | — | 500 |
| `h4` | 18px | 1.4 | 0 | 600 |
| `body` | 16.5px | 1.62 | 0 | 400 |
| `body-mobile` | 15.5px | 1.6 | 0 | 400 |
| `body-small` | 14.5px | 1.55 | 0 | 400 |
| `caption` | 12px | 1.4 | 0.02em | 500 |

### Eyebrow / section overline

- Font: IBM Plex Mono
- Size: ~14px (`.eyebrow` uses `clamp(12px, 1.1vw, 14px)`)
- Style: uppercase, tracking `0.16em`, colour `#8C8676` (`ink-mute`)
- Marker: 7×7px diamond (`rotate-45`) in `gold` (`#B4925A`)

---

## Layout & spacing

| Token | Value |
| --- | --- |
| Content max width | `1440px` (`max-w-content` / `.content-container`) |
| Content gutters | `clamp(1.25rem, 4vw, 3.5rem)` left/right |
| Long-form measure | `42rem` (`.content-measure`) |
| Section vertical padding | `.section-y` → `clamp(4.5rem, 8vw, 7.5rem)` |
| Section spacing token | `120px` desktop / `72px` mobile |
| Card gap | `28px` desktop / `18px` mobile |

---

## Radius

| Token | Value |
| --- | --- |
| Base `--radius` | `0.7rem` |
| `small` | `8px` |
| `medium` | `12px` |
| `large` | `18px` |
| `xl2` | `26px` |
| `full` | `9999px` (pills / CTAs) |

Also derived: `xl`, `lg`, `md`, `sm`, `xs` from `--radius`.

---

## Shadows

| Token | Value |
| --- | --- |
| `xs` | `0 1px 2px 0 rgb(20 35 59 / 0.05)` |
| `card` | `0 1px 2px rgba(20,35,59,0.04), 0 10px 30px -18px rgba(20,35,59,0.22)` |
| `card-hover` | `0 2px 6px rgba(20,35,59,0.06), 0 22px 48px -22px rgba(20,35,59,0.30)` |
| `statement` | `0 30px 70px -34px rgba(20,35,59,0.40), 0 8px 24px -16px rgba(20,35,59,0.20)` |
| `chip` | `0 14px 34px -16px rgba(20,35,59,0.32)` |
| `nav` | `0 1px 0 rgba(20,35,59,0.06), 0 12px 30px -22px rgba(20,35,59,0.25)` |
| Primary button | `0 10px 26px -12px rgba(15,110,94,0.7)` (hover intensifies) |

---

## Component / surface patterns

| Pattern | Treatment |
| --- | --- |
| `.rule` | Hairline gradient using `#DCD1B9` |
| `.perf` | Perforation dots `#DCD1B9` on 9×2px repeat |
| `.ledger-lines` | Faint horizontal rules `rgba(20,35,59,0.045)` every 34px |
| `.btn-primary` / `.btn-ghost` | Pill (`rounded-full`), 15px semibold sans |
| Section bands | Alternate `bg-paper` and `bg-paper-deep` with soft radial accents |

---

## Motion

| Animation | Timing |
| --- | --- |
| `float-soft` | 14s ease-in-out infinite (4px float) |
| `caret-blink` | 1.25s ease-out infinite |
| Accordion open/close | 0.2s ease-out |
| Reduced motion | Durations forced near-zero via `@media (prefers-reduced-motion: reduce)` |

Scroll: Lenis smooth scroll synced with GSAP ScrollTrigger.

---

## Quick reference (copy/paste)

```
Paper:      #F7F3EA
Raised:     #FCFAF4
Deep:       #EFE8D9
Ink:        #14233B
Ink soft:   #5B6573
Ink mute:   #8C8676
Evergreen:  #0F6E5E
Evergreen↓: #0B5749
Teal:       #1AA08C
Gold:       #B4925A
Gold soft:  #CBB07E
Line:       #E7DECC
Line strong:#DCD1B9

Display: Fraunces Variable
Sans:    Hanken Grotesk Variable
Mono:    IBM Plex Mono
```
