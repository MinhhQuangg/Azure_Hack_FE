/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#cbd5e1",
        tertiary: "#151030",
        "black-100": "#333333",
        "black-200": "#C0C0C0",
        "white-100": "#fde7dd",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
        md: "892px",
      },
    },
  },
  plugins: [],
};
