const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ServiceHub palette: navy type, teal brand, warm orange actions.
        primary: '#07877F',
        secondary: '#0B5F5B',
        accent: '#FF6B16',
        background: '#F7FAFB',
        blue: {
          ...colors.teal,
          50: '#EFFAF8',
          100: '#D7F1ED',
          200: '#AFE3DC',
          500: '#0AA39A',
          600: '#07877F',
          700: '#066E68',
        },
        sky: {
          ...colors.teal,
          50: '#EFFAF8',
          100: '#D7F1ED',
          200: '#AFE3DC',
          400: '#20B6AA',
          500: '#0AA39A',
          600: '#07877F',
          700: '#066E68',
        },
        cyan: {
          ...colors.teal,
          500: '#13A99E',
        },
      },
      borderRadius: {
        '20px': '20px',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
