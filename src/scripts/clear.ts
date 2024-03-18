import log from '../logger';
import service from '../service/astral-service';
import _ from 'lodash';

const run = async () => {
  try {
    await service.clearMap();

    log.info('done');
  } catch (e) {
    log.error(e);
  }
};

run();
