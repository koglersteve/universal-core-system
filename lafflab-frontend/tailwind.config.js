/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#ff4b8b",
          yellow: "#ffd166",
          purple: "#9b5de5",
          blue: "#4cc9f0",
          dark: "#1a1033",
        },
      },
    },
  },
  plugins: [],
};

