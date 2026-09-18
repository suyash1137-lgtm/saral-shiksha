/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeViolet: '#F5F0FF',
        gray: {
          50: '#F5F0FF',
        },
      },
    },
  },
  plugins: [],
}
