/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "960px",
        tablet: "1166px",
        lg: "1280px",
      },
    },
  },
  plugins: [require("daisyui")],
};
