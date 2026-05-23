import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f6f1e8",
        ink: "#1d2a1f",
        accent: "#0f766e",
        danger: "#b91c1c",
        warm: "#c2410c",
        gold: "#b58b2f"
      },
      boxShadow: {
        card: "0 18px 50px rgba(29, 42, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

