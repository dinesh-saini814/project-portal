/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "profile-icon": "url('/public/images/profile.png')",
      },
      colors: {
        background: "#fefefe",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
