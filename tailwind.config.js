/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        "Montserrat":"Montserrat",
        "Montserrat-Light":"Montserrat Light",
        "Inter":"Inter",
        "Inter-Bold":"Inter Bold",
        "Inter-Light":"Inter Light"
      }
    },
  },
  plugins: [],
}

