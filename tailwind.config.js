/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#42b883',
        secondary: '#8B7355',
        background: '#F5E6D3',
      },
    },
  },
  plugins: [],
}
