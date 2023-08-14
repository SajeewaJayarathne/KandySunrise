/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
      },
      fontFamily: {
        main: ['EB Garamond', 'serif'],
        secondary: ['Tangerine', 'serif']
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        primary: '#372d35',
        secondary: '#997e81',
        tertiary: '#c4b6bf',
        blue_1: '#4e596c',
        blue_2: '#f5fdff'
      }
    },
  },
  plugins: [],
}

