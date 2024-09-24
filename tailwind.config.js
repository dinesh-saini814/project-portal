const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js",
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
  plugins: [nextui(), require("daisyui")],
};
