import { Astral, ASTRAL_NAME, ASTRAL_TYPE } from '../types';

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
        ...(name == ASTRAL_NAME.SPACE && { type: ASTRAL_TYPE.SPACE }),
        ...(name == ASTRAL_NAME.POLYANET && { type: ASTRAL_TYPE.POLYANET }),
        ...(name == ASTRAL_NAME.SOLOON && { type: ASTRAL_TYPE.SOLOON, color: prefix.toLowerCase() }),
        ...(name == ASTRAL_NAME.COMETH && { type: ASTRAL_TYPE.COMETH, direction: prefix.toLowerCase() }),
        x,
        y,
      };
    })
  );
};

/**
 * Parse Map into array of astral objects
 * @param map the current map
 * @returns an array of astral objects
 */
export const parseMap = (map: any[][]): Astral[] => {
  return map.flatMap((row: string[], y: number) =>
    row.map((obj: any, x: number): Astral => {
      if (!obj) {
        return { name: ASTRAL_NAME.SPACE, type: ASTRAL_TYPE.SPACE, x, y };
      }

      return {
        ...(obj.type == ASTRAL_TYPE.POLYANET && { name: ASTRAL_NAME.POLYANET }),
        ...(obj.type == ASTRAL_TYPE.SOLOON && { name: ASTRAL_NAME.SOLOON }),
        ...(obj.type == ASTRAL_TYPE.COMETH && { name: ASTRAL_NAME.COMETH }),
        ...obj,
        x,
        y,
      };
    })
  );
};
