import client from '../api';
import config from '../config';
import logger from '../logger';
import { parseMap, parseGoalMap } from '../parsers';
import { Astral } from '../types';

const log = logger.child({ module: 'service' });

const getGoalMap = async () => {
  log.debug('get goal map');

  const data = await client.request({
    url: `/map/${config.candidateId}/goal`,
  });

  return parseGoalMap(data.goal);
};

const getMap = async () => {
  log.debug('get map');

  const data = await client.request({
    url: `/map/${config.candidateId}`,
  });

  return parseMap(data.map.content);
};

const typeToUrl = {
  0: '/polyanets',
  1: '/soloons',
  2: '/comeths',
};

const add = async (astral: Astral) => {
  log.debug(astral, 'create astral');

  const { x: column, y: row, type, ...rest } = astral;

  await client.request({
    method: 'post',
    url: typeToUrl[astral.type as keyof typeof typeToUrl],
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

const api = {
  getGoalMap,
  getMap,
  update,
  add,
  remove,
};

export default api;
