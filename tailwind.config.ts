import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:  '#0A0E1A',
        gold:  '#D4A017',
        green: '#1B5E20',
        red:   '#C62828',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
