// Color tokens map to CSS variables so you can theme in CSS without code changes

export const colors = {
  // base swatches
  primary: 'var(--color-primary)',
  red: 'var(--color-red)',
  green: 'var(--color-green)',
  yellow: 'var(--color-yellow)',
  blue: 'var(--color-blue)',
  natural: 'var(--color-natural)',
  white: 'var(--color-white)',
  stroke: 'var(--color-stroke)',

  // scales and variants
  'red-100': 'var(--color-red-100)',
  'red-10': 'var(--color-red-10)',
  'red-20': 'var(--color-red-20)',
  'red-5': 'var(--color-red-5)',

  'green-100': 'var(--color-green-100)',
  'green-10': 'var(--color-green-10)',
  'green-20': 'var(--color-green-20)',
  'green-5': 'var(--color-green-5)',

  'yellow-100': 'var(--color-yellow-100)',
  'yellow-10': 'var(--color-yellow-10)',
  'yellow-20': 'var(--color-yellow-20)',
  'yellow-5': 'var(--color-yellow-5)',

  'blue-100': 'var(--color-blue-100)',
  'blue-10': 'var(--color-blue-10)',

  'orange-100': 'var(--color-orange-100)',
  'orange-10': 'var(--color-orange-10)',

  'natural-100': 'var(--color-natural-100)',
  'natural-80': 'var(--color-natural-80)',
  'natural-60': 'var(--color-natural-60)',
  'natural-40': 'var(--color-natural-40)',
  'natural-20': 'var(--color-natural-20)',
  'natural-10': 'var(--color-natural-10)',
} as const;

export type ColorTokenName = keyof typeof colors;

export function getColor(name: ColorTokenName): string {
  return colors[name];
}

export default colors;

