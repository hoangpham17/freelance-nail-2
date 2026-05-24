/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern:
        /^(bg|text|border)-(madison-(black|black-soft|surface|gold|gold-dark|gold-text|text|muted|border))$/,
    },
    ...Array.from({ length: 193 }, (_, i) => {
      const size = i + 8;
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
        madison: {
          black: "#000000",
          "black-soft": "#1a1a1a",
          surface: "#252525",
          gold: "#f9be5c",
          "gold-dark": "#f1a953",
          "gold-text": "#984121",
          text: "#e5e7eb",
          muted: "#d1d5db",
          border: "#374151",
        },
        primary: {
          DEFAULT: "#f9be5c",
          dark: "#984121",
          light: "#f1a953",
          hover: "#ffe5a0",
        },
        secondary: {
          DEFAULT: "#984121",
          dark: "#7f4200",
          light: "#f1a953",
          hover: "#dba538",
        },
        accent: {
          DEFAULT: "#252525",
          cream: "#1a1a1a",
          light: "#374151",
          dark: "#000000",
        },
        text: {
          primary: "#e5e7eb",
          secondary: "#d1d5db",
          light: "#9ca3af",
          white: "#ffffff",
          gold: "#f9be5c",
        },
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
        sans: ["Montserrat", "Sora", "Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        gilroy: ['"SVN-Gilroy"', "Montserrat", "sans-serif"],
        playfairDisplay: ["Playfair Display", "serif"],
        tangerine: ["SVN-Tangerine", "serif"],
        corinthiaBold: ["SVN-Tangerine", "serif"],
        corinthiaRegular: ["SVN-Tangerine", "serif"],
        display: ["SVN-Tangerine", "serif"],
        body: ["Montserrat", "Sora", "sans-serif"],
      },
      fontSize: {
        "body-s": ["12px", { lineHeight: "16px" }],
        "body-l": ["16px", { lineHeight: "24px" }],
        "body-xl": ["18px", { lineHeight: "26px" }],
        "heading-2": ["48px", { lineHeight: "60px" }],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
