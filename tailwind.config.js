/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FFD254",
        secondary: "#E3E3E3",
        tertiary: "#151030",
        "black-100": "#333333",
        "black-200": "#C0C0C0",
        "white-100": "#fde7dd",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "560px",
        md: "892px",
        lg: "1024px",
        xl: "1430px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-green-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-cyan-400",
    "bg-yellow-400",
  ],
};
