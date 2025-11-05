/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C9A05C", // Elegant gold
          dark: "#A67C52",
          light: "#E8D4B5",
        },
        secondary: {
          DEFAULT: "#2C2C2C", // Sophisticated dark
          dark: "#1A1A1A",
          light: "#4A4A4A",
        },
        accent: {
          DEFAULT: "#F5F5F5", // Soft white
          cream: "#FFF8F0",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
