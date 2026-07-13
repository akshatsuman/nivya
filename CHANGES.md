# Nivya — Pre-Launch Website Update

Summary of changes made against the pre-launch brief. All edits are in `src/`
(the live app). The build is verified (`npm run build` passes) and the production
output is in `dist/`.

## 1. Navigation & CTAs
- Header: replaced the green **"Start a SIP"** button with **"Login"** → routes to `/login`
  (same styling/placement). Removed the now-redundant separate "Log in" text link.
- Mobile menu updated to a single **"Login"** entry.
- Hero primary CTA: **"Start a SIP"** → **"Login"** (→ `/login`).
- Hero secondary CTA: **"Explore funds"** → **"Explore returns"** (→ SIP calculator section).
- Footer CTA: **"Open an account"** → **"Log in"** (→ `/login`).

## 2. Removed simulated traction (now zeroed / honest)
- Hero trust row: removed the avatar pile + 5-star rating + "1,10,000+ investors";
  replaced with **"0 investors so far — we open at launch"**.
- "By the numbers" section retitled **"We're just getting started"**:
  - Invested through Nivya → **₹0 Cr+**
  - Investors → **0+**
  - SIP instalments processed → **0+**
  - Fund houses → kept at **38+** (genuine planned coverage, reframed "ready at launch").
- Login page: removed fake **"4.9 · 60,000+ investors"** rating.

## 3. "Coming soon" markers (product previews)
- The current build has **no literal empty left/right boxes**, so this was applied to
  the not-yet-live product previews:
  - Hero sample folio card (right): subtle **"Sample · Coming soon"** tag.
  - "Why Nivya" goal-planner card (left): subtle **"Coming soon"** chip.
- Fabricated testimonials (named people claiming multi-year use) replaced with an honest
  **"Stories worth waiting for / Coming soon"** panel.

## 4. Tagline "Wealth, Made Simple."
Integrated in the footer (under the wordmark), the login brand pane, and the page
`<title>` / meta description.

## 5. Copy
Softened lines implying the platform is already live (e.g. "most investors are done in
under five minutes" → "you'll likely be done…"). Existing editorial tone kept.

## 6. Footer disclaimer (mandatory)
Added the pre-launch **Disclaimer** block above the copyright line.

## 7. Social links
Instagram, X (Twitter), LinkedIn, **Facebook** (added) now point to the real handles
(`/nivyanow`), open in a new tab (`rel="noopener noreferrer"`), with accessible labels.

## Notes
- The project **root** contains stale duplicate files — `App.tsx`, `HomePage.tsx`,
  `LoginPage.tsx`, `Navigation.tsx` — that are **not** used by the build (the app loads
  from `src/`). They were left untouched. Safe to delete if you want a tidier repo.
- `node_modules/` was excluded from this package. Run `npm install` to restore it,
  then `npm run dev` (or `npm run build`).

## 8. Fonts (self-hosted — fixes the "font looks changed" issue)
The original loaded Fraunces / Hanken Grotesk / IBM Plex Mono from the Google Fonts
CDN. In any environment that can't reach that CDN (offline, some `file://` opens,
sandboxed screenshot tools), the headlines silently fell back to **Georgia**, which
is what looked like a font change.

Fix: the **same three typefaces** are now bundled locally via `@fontsource` (installed
from npm) and the external Google Fonts `<link>` was removed. Nothing about the type
design changes — it's the identical Fraunces (with optical sizing + italic), Hanken
Grotesk, and IBM Plex Mono — but the site now renders them reliably everywhere,
including offline and `file://`, with no CDN dependency.
