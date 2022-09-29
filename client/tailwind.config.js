// const tailwindcss = require("tailwindcss");
/** @type {import('tailwindcss').Config} */
// import head from './src/components/authentication/'

module.exports = {
  content: ["./src/components/**/*.js"],
  purge: {
    enabled: true,
    content: ['./src/components/**/*.{js,jsx}'],
  },
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}