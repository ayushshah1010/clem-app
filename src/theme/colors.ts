// Design tokens -- keep this file as the single source of truth for color.
// Never hardcode hex values in components; import from here.

export const colors = {
  cream: '#FFFCFA',
  creamDeep: '#F4EFEA',
  peach: '#FFF1E4',

  clementine: '#FF7A38',
  clementineSoft: '#FFB588',
  clementinePale: '#FFE1CB',

  rust: '#B5451C',
  plum: '#8A5468',
  plumSoft: '#F0E3E8',
  leaf: '#7A9B5E',

  espresso: '#241B15',
  espressoSoft: '#766559',

  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
