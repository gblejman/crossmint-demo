import client from '../api';
import config from '../config';
import logger from '../logger';
import { parseMap, parseGoalMap } from '../parsers';

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

const api = {
  getGoalMap,
  getMap,
};

export default api;
