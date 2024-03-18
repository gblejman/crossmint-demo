import config from './config';
import log from './log';

const run = async () => {
  try {
    log.info(config, 'running with config');
  } catch (e) {
    console.log(e);
  }
};

run();
