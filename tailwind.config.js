/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#153c63",
        secondary: "#2b79c7",
      },
    },
  },
  plugins: [],
};
