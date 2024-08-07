import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('/hero.webp')",
        "heroMobile": "url('/hero-mobile.webp')",
      },
      colors: {
        primary: '#051721',
        secundary: '#04151e',
        borderColor: '#89829446',
      }
    }
  },
  plugins: [],
};
export default config;