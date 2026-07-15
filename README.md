# Nivya

Wealth, made simple. A calm, transparent mutual-fund distribution landing site and demo investor app for India.

**Repository:** [https://github.com/akshatsuman/nivya](https://github.com/akshatsuman/nivya)

## Features

- Marketing landing page (hero, ranking, Ask Niv, portfolio insights, FAQ)
- Demo login (OTP flow) and investor app shell
- Fund explore, portfolio, plans, watchlist, and chat screens (client-side demo data)
- Smooth scroll and section motion (Lenis + GSAP)

## Tech stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3
- React Router 7
- GSAP, Lenis, Recharts

## Requirements

- Node.js 20+
- npm 10+

## Installation

```bash
git clone https://github.com/akshatsuman/nivya.git
cd nivya
npm install
```

Optional env template:

```bash
cp .env.example .env.local
```

## Development

```bash
npm run dev
```

App runs at [http://localhost:3000/](http://localhost:3000/).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run typecheck` | TypeScript project build check |

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Folder structure

```text
public/           Static assets (logo, robots.txt, sitemap)
src/
  app/            Investor app shell, auth, screens, demo data
  components/     Landing shared UI
  lib/            Shared helpers
  pages/          Route-level pages (home, login)
  sections/       Landing page sections
index.html
vite.config.ts
DESIGN_SYSTEM.md  Brand / design tokens
```

## License

MIT — see [LICENSE](./LICENSE).

## Contributing

Issues and pull requests are welcome for clear bugs and documentation fixes. For larger changes, open an issue first.
