/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#309255",
        softgreen: "#EEFBF3",
        borderlight: "#d4d4d8",
        muted: "#6b7280",
      },
      fontFamily: {
        mont: ["Montserrat", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        lexend: ["Lexend", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
