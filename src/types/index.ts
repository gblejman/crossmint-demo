/** Constants */

export const ASTRAL_NAME = {
  SPACE: 'SPACE',
  POLYANET: 'POLYANET',
  SOLOON: 'SOLOON',
  COMETH: 'COMETH',
} as const;

export const ASTRAL_TYPE = {
  SPACE: -1,
  POLYANET: 0,
  SOLOON: 1,
  COMETH: 2,
} as const;

export const SOLOON_COLORS = {
  BLUE: 'blue',
  RED: 'red',
  PURPLE: 'purple',
  WHITE: 'white',
} as const;

export const COMETH_DIRECTIONS = { UP: 'up', DOWN: 'down', RIGHT: 'right', LEFT: 'left' } as const;

/** Types */

export type Astral = {
  name: ValueOf<typeof ASTRAL_NAME>;
  type: ValueOf<typeof ASTRAL_TYPE>;
  x: number;
  y: number;
  color?: ValueOf<typeof SOLOON_COLORS>;
  direction?: ValueOf<typeof COMETH_DIRECTIONS>;
};

type ValueOf<T> = T[keyof T];
