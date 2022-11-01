/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
