import client from '../api';
import config from '../config';
import logger from '../logger';
import { parseMap, parseGoalMap } from '../parsers';
import { Astral } from '../types';
import { PromisePool } from '@supercharge/promise-pool';
import { validate } from './utils';

const log = logger.child({ module: 'service' });

const TYPE_TO_URL = {
  0: '/polyanets',
  1: '/soloons',
  2: '/comeths',
};

const add = async (astral: Astral) => {
  log.debug(astral, 'create astral');

  const { x: column, y: row, type, ...rest } = astral;

  await client.request({
    method: 'post',
    url: TYPE_TO_URL[astral.type as keyof typeof TYPE_TO_URL],
    data: {
      row: astral.y,
      column: astral.x,
      candidateId: config.candidateId,
      ...rest,
    },
  });

  return astral;
};

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

const update = (astral: Astral) => {
  return astral.type == -1 ? remove(astral) : add(astral);
};

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

const getGoalMap = async () => {
  const data = await client.request({
    url: `/map/${config.candidateId}/goal`,
  });

  return parseGoalMap(data.goal);
};

const getMap = async () => {
  const data = await client.request({
    url: `/map/${config.candidateId}`,
  });

  return parseMap(data.map.content);
};

const validateMap = async () => {
  const goalMap = await getGoalMap();
  const map = await getMap();

  return validate(goalMap, map);
};

const solveMap = async () => {
  let valid = await validateMap();

  while (!valid.isValid) {
    await updateMany(valid.difference);
    valid = await validateMap();
  }
};

const api = {
  getGoalMap,
  getMap,
  validateMap,
  solveMap,
  add,
  remove,
  update,
  updateMany,
};

export default api;
