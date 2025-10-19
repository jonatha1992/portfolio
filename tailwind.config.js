/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',
          light: '#60A5FA',
          dark: '#1E3A8A',
        },
        accent: '#F59E0B',
        background: '#0F172A',
        surface: '#1F2937',
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      boxShadow: {
        glow: '0 25px 60px rgba(30, 58, 138, 0.25)',
        soft: '0 18px 40px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
