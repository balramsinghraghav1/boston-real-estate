/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // A nice plugin for form styling
  ],
};
