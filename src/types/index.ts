export type Astral = {
  name: 'SPACE' | 'POLYANET' | 'SOLOON' | 'COMETH';
  type: number;
  x: number;
  y: number;
  color?: 'blue' | 'red' | 'purple' | 'white';
  direction?: 'up' | 'down' | 'right' | 'left';
};

/** Constants */
export const ASTRAL_NAMES = ['SPACE', 'POLYANET', 'SOLOON', 'COMETH'];
export const SOLOON_COLORS = ['BLUE', 'RED', 'PURPLE', 'WHITE'];
export const COMETH_DIRECTIONS = ['UP', 'DOWN', 'RIGHT', 'LEFT'];
