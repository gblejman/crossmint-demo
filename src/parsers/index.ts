import { Astral, ASTRAL_NAMES } from '../types';

/**
 * Parse Goal Map into array of astral objects
 * @param goalMap the goal map
 * @returns an array of astral objects
 */
export const parseGoalMap = (goalMap: string[][]): Astral[] => {
  return goalMap.flatMap((row: string[], y: number) =>
    row.map((cell: string, x: number): Astral => {
      let [prefix, name] = cell.split('_');

      if (!name) {
        name = prefix;
      }

      return {
        // @ts-ignore
        name,
        ...(name == 'SPACE' && { type: -1 }),
        ...(name == 'POLYANET' && { type: 0 }),
        ...(name == 'SOLOON' && { type: 1, color: prefix.toLowerCase() }),
        ...(name == 'COMETH' && { type: 2, direction: prefix.toLowerCase() }),
        x,
        y,
      };
    })
  );
};

/**
 * Parse Map into array of astral objects
 * @param map the goal map
 * @returns an array of astral objects
 */
export const parseMap = (map: any[][]): Astral[] => {
  return map.flatMap((row: string[], y: number) =>
    row.map((obj: any, x: number): Astral => {
      if (!obj) {
        return { name: 'SPACE', type: -1, x, y };
      }

      return {
        ...(obj.type == 0 && { name: 'POLYANET' }),
        ...(obj.type == 1 && { name: 'SOLOON' }),
        ...(obj.type == 2 && { name: 'COMETH' }),
        ...obj,
        x,
        y,
      };
    })
  );
};
