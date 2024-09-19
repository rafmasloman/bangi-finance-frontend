const { baseColors } = require('./src/constants/colors');

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...baseColors,
      },
      fontFamily: {
        primary: 'Urbanist',
        secondary: 'Nunito Sans',
      },
    },
  },
  plugins: [],
};