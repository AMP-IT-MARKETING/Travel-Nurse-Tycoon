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
          primary: "#2563eb",
          success: "#16a34a",
          warning: "#f59e0b",
        },
        surface: {
          50: "#f8fafc",
          100: "#eef2ff",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        "soft-xl": "0 20px 40px -20px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
