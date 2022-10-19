/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        Pink:{
          normal: "#F8E6FB",
        },
        Purple:{
          normal: "#E162E7"
        },
        Blue:{
          normal: "#5563F0"
        }
      },
      fontFamily:{
        customFont:['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
