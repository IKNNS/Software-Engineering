/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0165FF",
        secondary: "#90969D",
        main: "#1e2944",
        action: "#F1F6F7",
        link: "#456AA0",
      },
      fontFamily: {
        kanit: "kanit",
      },
      boxShadow: {
        out: "0 0 3px 0 #90969D",
        out2: "0 0 30px -5px #90969D",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
