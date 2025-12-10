/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Pre-declare all font size classes from 8px to 52px
    // This ensures Tailwind recognizes all dynamic classes
    ...Array.from({ length: 45 }, (_, i) => {
      const size = i + 8; // 8 to 52
      return [
        `text-[${size}px]`,
        `sm:text-[${size}px]`,
        `md:text-[${size}px]`,
        `lg:text-[${size}px]`,
        `xl:text-[${size}px]`,
        `2xl:text-[${size}px]`,
      ];
    }).flat(),
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Gold/Elegant
        primary: {
          DEFAULT: "#D4AF37", // Main gold color
          dark: "#A67C52",
          light: "#E8D4B5",
          hover: "#F4D03F", // Lighter gold for hover states
        },
        // Secondary Colors - Brown/Earth tones
        secondary: {
          DEFAULT: "#8B4513", // Saddle brown
          dark: "#654321", // Darker brown
          light: "#A0522D", // Sienna (hover state)
          hover: "#A0522D",
        },
        // Accent Colors - Cream/Beige
        accent: {
          DEFAULT: "#F5F5DC", // Beige
          cream: "#FAEBD7", // Antique white
          light: "#FFF8F0", // Floral white
          dark: "#E6E6D3",
        },
        // Pink Colors - For booking buttons
        pink: {
          DEFAULT: "#FFB6C1", // Light pink
          dark: "#FFA0B4", // Darker pink (hover)
          light: "#FFC0CB", // Lighter pink
        },
        // Text Colors
        text: {
          primary: "#1F2937", // Dark gray for main text
          secondary: "#4B5563", // Medium gray for secondary text
          light: "#6B7280", // Light gray for muted text
          white: "#FFFFFF",
          gold: "#D4AF37",
        },
        // Keep existing neutral colors
        neutral: {
          white: "#FFFFFF",
          black: "#000000",
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
          },
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        prata: ["Prata", "serif"],
      },
    },
  },
  plugins: [],
};
