/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // container: {
      //   center: true,
      //   screens: {
      //     lg: '1312px'
      //   }
      // },
      colors: {
        primary: "#FF6363",
      },
    },
  },
  plugins: [],
};
