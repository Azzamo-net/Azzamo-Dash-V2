/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F5A623',
          50: '#FEF3E3',
          100: '#FDE9C7',
          200: '#FBD48F',
          300: '#F9BF57',
          400: '#F7AA1F',
          500: '#F5A623',
          600: '#D38A0C',
          700: '#A16909',
          800: '#6F4706',
          900: '#3D2603'
        }
      }
    },
  },
  plugins: [],
};