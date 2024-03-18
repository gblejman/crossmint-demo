import config from './config';
import log from './logger';
import service from './service';

const run = async () => {
  try {
    log.debug(config, 'running with config');

    const map = await service.getMap();
    log.info(map, 'map');

    const goalMap = await service.getGoalMap();
    log.info(goalMap, 'map');
  } catch (e) {
    log.error(e);
  }
};

run();
