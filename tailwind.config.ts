import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00FFA3',
        'secondary': '#FF6B00',
        'bg-deep': '#050505',
        'card-bg': 'rgba(10, 10, 10, 0.7)',
        'bg-base': '#050505',
        'bg-surface': 'rgba(0, 255, 163, 0.03)',
        'accent-primary': '#00FFA3',
        'accent-secondary': '#8A2BE2',
        'border-default': '#333333',
        'border-active': '#00FFA3',
      },
      fontFamily: {
        mono: ['"Space Mono"', '"Fira Code"', '"JetBrains Mono"', 'monospace'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'squircle': '24%',
        'card': '16px',
        'interactive': '8px'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: "1.1rem",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
