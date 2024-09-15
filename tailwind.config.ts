import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // https://uicolors.app/create
        PRIMARY: {
          50: "#d4eaf7",
          base: "#d4eaf7",
          200: "#c3e4f4",
          300: "#8ed0eb",
          400: "#52b7de",
          500: "#2b9fcc",
          600: "#1c80ad",
          700: "#18668c",
          800: "#185774",
          900: "#194961",
          950: "#112e40",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        textColor: {
          50: "#f4f7fb",
          100: "#e9eef5",
          200: "#cddcea",
          300: "#a2bfd7",
          400: "#6f9dc1",
          500: "#4d81aa",
          600: "#3b678e",
          700: "#305374",
          800: "#2b4761",
          900: "#283d52",
          base: "#1f2e3f",
        },

        ACCENT: {
          50: "#f3f7fb",
          100: "#e3edf6",
          200: "#cee0ef",
          300: "#accbe4",
          400: "#85b0d5",
          base: "#5f8fc6",
          600: "#547ebc",
          700: "#4a6bab",
          800: "#41588c",
          900: "#384b70",
          950: "#263045",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

// Blues Theme
// --primary-100:#d4eaf7;
// --primary-200:#b6ccd8;
// --primary-300:#3b3c3d;
// --accent-100:#5f8fc6;
// --accent-200:#003867;
// --text-100:#1f2e3f;
// --text-200:#48576a;
// --bg-100:#fffefb;
// --bg-200:#f5f4f1;
// --bg-300:#cccbc8;
