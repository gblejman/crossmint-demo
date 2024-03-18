import config from './config';
import log from './logger';
import service from './service/astral-service';

const run = async () => {
  try {
    log.debug(config, 'running with config');

    await service.solveMap();

    log.info('done');
  } catch (e) {
    log.error(e);
  }
};

run();
