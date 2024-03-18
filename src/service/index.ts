import client from '../api';
import config from '../config';
import logger from '../logger';
import { parseMap, parseGoalMap } from '../parsers';
import { ASTRAL_NAME, ASTRAL_TYPE, Astral } from '../types';
import { PromisePool } from '@supercharge/promise-pool';
import { validate } from './utils';

const log = logger.child({ module: 'service' });

const ASTRAL_TYPE_TO_URL = {
  0: '/polyanets',
  1: '/soloons',
  2: '/comeths',
};

/**
 * Creates an astral object
 * @param astral
 * @returns the created object
 */
const create = async (astral: Astral) => {
  log.debug(astral, 'create astral');

  const { x: column, y: row, type, ...rest } = astral;

  await client.request({
    method: 'post',
    url: ASTRAL_TYPE_TO_URL[astral.type as keyof typeof ASTRAL_TYPE_TO_URL],
    data: {
      row: astral.y,
      column: astral.x,
      candidateId: config.candidateId,
      ...rest,
    },
  });

  return astral;
};

/**
 * Removes an astral object
 * @param astral
 * @returns the removed object
 */
const remove = async (astral: Astral) => {
  log.debug(astral, 'remove astral');

  const { x: column, y: row } = astral;

  await client.request({
    method: 'delete',
    url: '/polyanets',
    data: {
      row,
      column,
      candidateId: config.candidateId,
    },
  });

  return astral;
};

/**
 * Updates (creates/removes) an astral object
 * @param astral
 * @returns the updated object
 */
const update = (astral: Astral) => {
  return astral.type == -1 ? remove(astral) : create(astral);
};

/**
 * Updates many astral objects
 * @param astrals
 * @returns the updated objects
 */
const updateMany = async (astrals: Astral[]) => {
  const { results } = await PromisePool.for(astrals)
    .withConcurrency(config.service.concurrency)
    .useCorrespondingResults()
    .onTaskStarted((item, pool) => {
      log.info(
        { progress: pool.processedPercentage(), active: pool.activeTasksCount(), finished: pool.processedCount() },
        'pool'
      );
    })
    .process(async (astral, index) => {
      return update(astral);
    });

  return results;
};

/**
 * Gets the goal map
 * @returns the goal map as array of astral objects
 */
const getGoalMap = async () => {
  const data = await client.request({
    url: `/map/${config.candidateId}/goal`,
  });

  return parseGoalMap(data.goal);
};

/**
 * Gets the current map
 * @returns the current map as array of astral objects
 */
const getMap = async () => {
  const data = await client.request({
    url: `/map/${config.candidateId}`,
  });

  return parseMap(data.map.content);
};

/**
 * Validates the current map vs the goal map
 * @see ./utils.validate
 * @returns the validation object
 */
const validateMap = async () => {
  const goalMap = await getGoalMap();
  const map = await getMap();

  return validate(goalMap, map);
};

/**
 * Solves the map by inserting the missing astral objects
 */
const solveMap = async () => {
  let valid = await validateMap();

  while (!valid.isValid) {
    await updateMany(valid.difference);
    valid = await validateMap();
  }
};

/**
 * Clears the map by inserting all SPACE objects
 */
const clearMap = async () => {
  const goalMap = await getGoalMap();

  await updateMany(
    goalMap.map((astral) => ({ name: ASTRAL_NAME.SPACE, type: ASTRAL_TYPE.SPACE, x: astral.x, y: astral.y }))
  );
};

const api = {
  getGoalMap,
  getMap,
  validateMap,
  solveMap,
  clearMap,
  create,
  remove,
  update,
  updateMany,
};

export default api;
