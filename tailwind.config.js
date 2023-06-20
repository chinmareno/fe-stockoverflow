/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        26: "26px",
        18: "18px",
      },
      fontFamily: {
        helvetica: ["Helvetica", "sans-serif"],
        sans: [
          "Open Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        palegrey: "#F9F9F9",
        charcoal: "#333333",
        gray: "#A4AEB7",
        darkgrey: " #333333",
        lightgrey: "#F6F6F6",
        lightblue: "#4AB3F4 ",
        steelgrey: "#6C757D",
        turqoise: "#17A2B8",
        blackepicgame: "#121212",
        darkblueepicgame: "#030421",
        navyblueepicgame: "#050555",
        purpleepicgame: "#1B0E46",
      },
      spacing: {
        13: "51.797px",
        17: "70px",
      },
    },
  },
  plugins: [],
};
