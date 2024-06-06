import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('/hero.webp')",
      },
      colors: {
        primary: '#19464b',
        secundary: '#3f5f5b',
        greenAvocado: '#3f5f5b'
      }
    }
  },
  plugins: [],
};
export default config;
