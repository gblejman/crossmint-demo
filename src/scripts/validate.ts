import log from '../logger';
import service from '../service';
import _ from 'lodash';

const run = async () => {
  try {
    const valid = await service.validateMap();

    log.info(valid, 'validation');
    log.info('done');
  } catch (e) {
    log.error(e);
  }
};

run();
