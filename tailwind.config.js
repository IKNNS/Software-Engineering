/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#03bb4f",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
