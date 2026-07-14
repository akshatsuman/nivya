/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ── Nivya : private-wealth-office palette ─────────────────
           Warm ivory paper, deep ink-navy, evergreen growth, brass.  */
        paper: "#F7F3EA", // page background (warm bone)
        "paper-raised": "#FCFAF4", // cards / raised surfaces
        "paper-deep": "#EFE8D9", // deeper bands, insets
        ink: "#14233B", // primary text / deep navy (trust)
        "ink-soft": "#5B6573", // secondary text
        "ink-mute": "#8C8676", // captions, warm muted
        evergreen: "#0F6E5E", // growth accent / primary CTA
        "evergreen-deep": "#0B5749", // CTA hover
        teal: "#1AA08C", // bright highlight (echoes the logo)
        gold: "#B4925A", // brass : premium, used sparingly
        "gold-soft": "#CBB07E",
        line: "#E7DECC", // warm hairline on paper
        "line-strong": "#DCD1B9",
      },
      fontFamily: {
        display: ["Fraunces Variable", "Fraunces", "Georgia", "serif"],
        sans: ["Hanken Grotesk Variable", "Hanken Grotesk", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["76px", { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "500" }],
        "display-mobile": [
          "42px",
          { lineHeight: "1.04", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        h1: ["48px", { lineHeight: "1.08", letterSpacing: "-0.015em", fontWeight: "500" }],
        "h1-mobile": ["33px", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "500" }],
        h2: ["32px", { lineHeight: "1.16", letterSpacing: "-0.01em", fontWeight: "500" }],
        "h2-mobile": ["25px", { lineHeight: "1.18", letterSpacing: "-0.005em", fontWeight: "500" }],
        h3: ["23px", { lineHeight: "1.3", fontWeight: "500" }],
        "h3-mobile": ["20px", { lineHeight: "1.3", fontWeight: "500" }],
        h4: ["18px", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        body: ["16.5px", { lineHeight: "1.62", letterSpacing: "0", fontWeight: "400" }],
        "body-mobile": ["15.5px", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "body-small": ["14.5px", { lineHeight: "1.55", letterSpacing: "0", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        small: "8px",
        medium: "12px",
        large: "18px",
        xl2: "26px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(20 35 59 / 0.05)",
        card: "0 1px 2px rgba(20,35,59,0.04), 0 10px 30px -18px rgba(20,35,59,0.22)",
        "card-hover": "0 2px 6px rgba(20,35,59,0.06), 0 22px 48px -22px rgba(20,35,59,0.30)",
        statement: "0 30px 70px -34px rgba(20,35,59,0.40), 0 8px 24px -16px rgba(20,35,59,0.20)",
        chip: "0 14px 34px -16px rgba(20,35,59,0.32)",
        nav: "0 1px 0 rgba(20,35,59,0.06), 0 12px 30px -22px rgba(20,35,59,0.25)",
      },
      spacing: {
        section: "120px",
        "section-mobile": "72px",
        "card-gap": "28px",
        "card-gap-mobile": "18px",
      },
      maxWidth: {
        content: "1440px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float-soft": "float-soft 14s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
