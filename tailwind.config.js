/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          10: "var(--accent-10)",
          20: "var(--accent-20)",
          30: "var(--accent-30)",
        },
      },
    },
  },
  plugins: [],
};
