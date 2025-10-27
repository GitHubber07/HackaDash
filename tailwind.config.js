/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode toggling via a 'dark' class on the <html> element
  darkMode: 'class', 
  
  // Define the files to scan for Tailwind class names
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Set 'Inter' as the default sans-serif font
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  // Add the official Tailwind typography plugin for styling prose
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

