/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // 1. Add daisyui to plugins
  plugins: [
    require("tailwindcss-animate"), // (Existing shadcn plugin)
    require("daisyui")              // ✅ Add this
  ],
  // 2. Configure the themes
  daisyui: {
    themes: [
      "light", "dark"
    ],
  },
}