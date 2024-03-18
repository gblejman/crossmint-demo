import { Astral } from '../types';
import _ from 'lodash';

/**
 * Validates whether the goal map matches the current map, returning any elements present in goal map but missing in current map
 * @param goalMap the goal map
 * @param map the current map
 * @returns the validation
 */
export const validate = (goalMap: Astral[], map: Astral[]) => {
  const isValid = _.isEqual(goalMap, map);
  const difference = _.differenceWith(goalMap, map, _.isEqual);

  return { isValid, difference };
};
