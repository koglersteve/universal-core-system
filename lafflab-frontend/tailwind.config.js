/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/core/**/*.{ts,tsx}",
    "./src/notifications/**/*.{ts,tsx}",
    "./src/personalization/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF5C7A",
          dark: "#D9445E",
          light: "#FF9FB2"
        }
      },
      borderRadius: {
        xl: "1.25rem"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out"
      }
    }
  },
  plugins: []
};

