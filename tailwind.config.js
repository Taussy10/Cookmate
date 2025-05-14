/** @type {import('tailwindcss').Config} */
module.exports = {
  // you have to change your content here 
  content: ['src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
    fontFamily:{
      pRegular: ["Poppins_400Regular"],
      pSemibold: ["Poppins_600SemiBold"],
      pBold: ["Poppins_700Bold"],
    },
  colors: {
    primary: '#f6f6f4',
    secondary: '#ffffff',
    accent: '#4ade80'
  }
  },
  },
  plugins: [],
};
