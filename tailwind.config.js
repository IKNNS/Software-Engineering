/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        bg: '#D1E8F4'
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
