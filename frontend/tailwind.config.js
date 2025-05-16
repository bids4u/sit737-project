const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        accent: '#FF3B3B',
        text: '#000000',
        secondary: '#F5F5F5',
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
});
