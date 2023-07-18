/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      zIndex: {
        '200': '200',
      },
      margin: {
        '7pct': '7%',
        '10pct': '10%',
        '12pct': '12%'
      },
      fontFamily: {
        main: ['Gill Sans', 'sans-serif'],
        body: ['Georgia', 'serif']
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
}

