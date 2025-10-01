/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        red: 'var(--color-red)',
        green: 'var(--color-green)',
        yellow: 'var(--color-yellow)',
        blue: 'var(--color-blue)',
        natural: 'var(--color-natural)',
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
