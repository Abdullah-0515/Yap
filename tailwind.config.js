/** @type {import('tailwindcss').Config} */
const v = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: v('paper'), card: v('card'), ink: v('ink'), muted: v('muted'),
        line: v('line'), hl: v('hl'), pink: v('pink'),
        win: v('win'), loss: v('loss'), meh: v('meh'),
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        sans: ['Karla', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
        marker: ['"Permanent Marker"', 'cursive'],
      },
      borderRadius: { slip: '6px' },
      boxShadow: {
        hard: '4px 4px 0 0 rgb(var(--ink))',
        'hard-sm': '2px 2px 0 0 rgb(var(--ink))',
        'hard-lg': '7px 7px 0 0 rgb(var(--ink))',
      },
    },
  },
  plugins: [],
}
