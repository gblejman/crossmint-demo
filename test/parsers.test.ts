import { parseGoalMap, parseMap } from '../src/parsers';
import _ from 'lodash';

describe('Parsers', () => {
  describe('parseGoalMap', () => {
    it('Parses goal map correctly', () => {
      const goalMap = [
        [
          'SPACE',
          'POLYANET',
          'BLUE_SOLOON',
          'RED_SOLOON',
          'PURPLE_SOLOON',
          'WHITE_SOLOON',
          'UP_COMETH',
          'DOWN_COMETH',
          'RIGHT_COMETH',
          'LEFT_COMETH',
        ],
      ];

      const actual = parseGoalMap(goalMap);

      const expected = [
        { name: 'SPACE', type: -1, x: 0, y: 0 },
        { name: 'POLYANET', type: 0, x: 1, y: 0 },
        { name: 'SOLOON', type: 1, x: 2, y: 0, color: 'blue' },
        { name: 'SOLOON', type: 1, x: 3, y: 0, color: 'red' },
        { name: 'SOLOON', type: 1, x: 4, y: 0, color: 'purple' },
        { name: 'SOLOON', type: 1, x: 5, y: 0, color: 'white' },
        { name: 'COMETH', type: 2, x: 6, y: 0, direction: 'up' },
        { name: 'COMETH', type: 2, x: 7, y: 0, direction: 'down' },
        { name: 'COMETH', type: 2, x: 8, y: 0, direction: 'right' },
        { name: 'COMETH', type: 2, x: 9, y: 0, direction: 'left' },
      ];

      expect(_.isEqual(actual, expected)).toBeTruthy();
    });
  });

  describe('parseMap', () => {
    it('Parses map correctly', () => {
      const map = [
        [
          null,
          { type: 0 },
          { type: 1, color: 'blue' },
          { type: 1, color: 'red' },
          { type: 1, color: 'purple' },
          { type: 1, color: 'white' },
          { type: 2, direction: 'up' },
          { type: 2, direction: 'down' },
          { type: 2, direction: 'right' },
          { type: 2, direction: 'left' },
        ],
      ];

      const actual = parseMap(map);

      const expected = [
        { name: 'SPACE', type: -1, x: 0, y: 0 },
        { name: 'POLYANET', type: 0, x: 1, y: 0 },
        { name: 'SOLOON', type: 1, x: 2, y: 0, color: 'blue' },
        { name: 'SOLOON', type: 1, x: 3, y: 0, color: 'red' },
        { name: 'SOLOON', type: 1, x: 4, y: 0, color: 'purple' },
        { name: 'SOLOON', type: 1, x: 5, y: 0, color: 'white' },
        { name: 'COMETH', type: 2, x: 6, y: 0, direction: 'up' },
        { name: 'COMETH', type: 2, x: 7, y: 0, direction: 'down' },
        { name: 'COMETH', type: 2, x: 8, y: 0, direction: 'right' },
        { name: 'COMETH', type: 2, x: 9, y: 0, direction: 'left' },
      ];

      expect(_.isEqual(actual, expected)).toBeTruthy();
    });
  });
});
