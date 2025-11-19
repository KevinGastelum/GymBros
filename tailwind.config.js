/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gymGold: "transparent",
        goldMetallic: "linear-gradient(145deg, #B8860B, #FFD700, #B8860B)",
        darkGray: "#121212",
        lightGray: "#F5F5F5",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

