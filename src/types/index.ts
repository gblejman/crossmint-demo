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

/** Types */

export type Astral = {
  name: ValueOf<typeof ASTRAL_NAME>;
  type: ValueOf<typeof ASTRAL_TYPE>;
  x: number;
  y: number;
  color?: 'blue' | 'red' | 'purple' | 'white';
  direction?: 'up' | 'down' | 'right' | 'left';
};

type ValueOf<T> = T[keyof T];
