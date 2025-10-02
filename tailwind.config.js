/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        red: {
          DEFAULT: 'var(--color-red)',
          100: 'var(--color-red-100)',
          20: 'var(--color-red-20)',
          10: 'var(--color-red-10)',
          5: 'var(--color-red-5)'
        },
        green: {
          DEFAULT: 'var(--color-green)',
          100: 'var(--color-green-100)',
          20: 'var(--color-green-20)',
          10: 'var(--color-green-10)',
          5: 'var(--color-green-5)'
        },
        yellow: {
          DEFAULT: 'var(--color-yellow)',
          100: 'var(--color-yellow-100)',
          20: 'var(--color-yellow-20)',
          10: 'var(--color-yellow-10)',
          5: 'var(--color-yellow-5)'
        },
        blue: {
          DEFAULT: 'var(--color-blue)',
          100: 'var(--color-blue-100)',
          10: 'var(--color-blue-10)'
        },
        orange: {
          100: 'var(--color-orange-100)',
          10: 'var(--color-orange-10)'
        },
        natural: {
          DEFAULT: 'var(--color-natural)',
          100: 'var(--color-natural-100)',
          80: 'var(--color-natural-80)',
          60: 'var(--color-natural-60)',
          40: 'var(--color-natural-40)',
          20: 'var(--color-natural-20)',
          10: 'var(--color-natural-10)'
        },
        white: 'var(--color-white)',
        stroke: 'var(--color-stroke)'
      },
      fontFamily: {
        plex: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};
