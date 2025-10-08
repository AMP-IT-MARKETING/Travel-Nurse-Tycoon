import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#00AAA1",
          ocean: "#3E4E56",
          success: "#137D79",
          warning: "#FFC700",
        },
        surface: {
          50: "#F7FAFC",
          100: "#FFFFFF",
        },
        border: {
          subtle: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Source Sans Pro",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        accent: [
          "var(--font-accent)",
          "Adelle",
          "Source Serif Pro",
          "serif",
        ],
      },
      boxShadow: {
        "soft-xl": "0 24px 40px -24px rgba(62, 78, 86, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
