/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: {
          950: 'rgba(35,31,32,1)',
          500: 'rgba(35,31,32,0.5)',
          300: 'rgba(35,31,32,0.3)',
          200: 'rgba(35,31,32,0.2)',
          100: 'rgba(35,31,32,0.1)',
          50: 'rgba(35,31,32,0.05)',
        },
        secondary: {
          950: 'rgb(113,113,113)',
          500: 'rgba(113,113,113,0.5)',
          300: 'rgba(113,113,113,0.3)',
          200: 'rgba(113,113,113,0.2)',
          100: 'rgba(113,113,113,0.1)',
          50: 'rgba(113,113,113,0.05)',
        },
        inputColor: {
          950: 'rgb(53,50,46)',
        },
        main: {
          50: 'rgba(241,90,41,1)',
        },
        screens: {
          50: 'rgb(244,244,243)',
        }
      },
    },
  },
  plugins: [],
}