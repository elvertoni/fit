import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
    './types.ts',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b1f3a',
          teal: '#14b8a6',
          sky: '#38bdf8',
          sand: '#f6f3ee',
          gold: '#f59e0b',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
