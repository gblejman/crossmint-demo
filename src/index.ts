import config from './config';
import log from './logger';
import service from './service';

const run = async () => {
  try {
    log.debug(config, 'running with config');

    const goalMap = await service.getGoalMap();
    log.info(goalMap, 'goal map');

    const map = await service.getMap();
    log.info(map, 'map');

    const result = await service.updateMany(goalMap);

    log.info(result, 'created astrals');
  } catch (e) {
    log.error(e);
  }
};

run();
