/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        bg: '#D1E8F4',
        second: "#f7f7f7",
        main:"#032c5a"
      },
      fontFamily: {
        'kanit': 'kanit'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
