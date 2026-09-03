/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#FF9933', light: '#FFB366', dark: '#E68A2E' },
        secondary: { DEFAULT: '#138808', light: '#1CA80E', dark: '#0F6B06' },
        accent: { DEFAULT: '#1E40AF', light: '#3B5FC9', dark: '#16338B' },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
