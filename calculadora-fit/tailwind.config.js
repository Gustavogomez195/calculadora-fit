/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      Fontfamily:{

       "poppins":["Poppins", "sans-serif"]}
    },
  },
  plugins: [],
}

