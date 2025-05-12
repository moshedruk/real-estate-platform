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
        primary: '#2563eb', // blue-600
        'primary-dark': '#1d4ed8', // blue-700
        secondary: '#475569', // slate-600
      },
    },
  },
  plugins: [],
}

export default config 