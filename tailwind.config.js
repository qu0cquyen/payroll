const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          background: "hsl(var(--muted-background))",
        },
        primary: {
          lightest: "var(--primary-lightest)",
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        neutral: {
          light: "var(--neutral-light)",
          lighter: "var(--neutral-lighter)",
          lightest: "var(--neutral-lightest)",
          tints: "var(--neutral-tints)",
          DEFAULT: "var(--neutral)",
          darker: "var(--neutral-darker)",
          darkest: "var(--neutral-darkest)",
        },
        accent: {
          lightest: "var(--accent-lightest)",
          lighter: "var(--accent-lighter)",
          darker: "var(--accent-darker)",
          darkest: "var(--accent-darkest)",
        },
        state: {
          positive: "var(--state-positive)",
          "positive-light": "var(--state-positive-light)",
          "positive-dark": "var(--state-positive-dark)",
          negative: "var(--state-negative)",
          "negative-light": "var(--state-negative-light)",
          primary: "var(--state-primary)",
          critical: "var(--state-critical)",
          informative: "var(--state-informative)",
        },
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      fontSize: {
        ...defaultTheme.fontSize,
        "3xl": ["1.75rem", "2,625rem"],
      },
      boxShadow: {
        ...defaultTheme.dropShadow,
        DEFAULT: "var(--box-shadow)",
      },
      spacing: {
        ...defaultTheme.spacing,
        4.5: "1.125rem",
        5.5: "1.375rem",
        13: "3.25rem",
        25: "6.25rem",
        31: "7.75rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-slide-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
        "collapsible-slide-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-slide-up": "collapsible-slide-up 0.2s ease-out",
        "collapsible-slide-down": "collapsible-slide-down 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
