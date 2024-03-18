import log from '../logger';
import service from '../service';
import _ from 'lodash';

const run = async () => {
  try {
    await service.solveMap();

    log.info('done');
  } catch (e) {
    log.error(e);
  }
};

run();
