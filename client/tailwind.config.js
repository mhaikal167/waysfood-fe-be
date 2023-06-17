/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}','./public/*.html'],
  theme: {
    extend: {},
    fontFamily: {
      avenir:['Sen','sans-serif'],
      abhava:['Sen' ,'Abhaya Libre']
    },
    colors:{
      primary:"#FFC700",
      secondary:"#433434",
      cancel:"#E83939",
      success:"#78A85A"
    }
  },
  plugins: [],
});