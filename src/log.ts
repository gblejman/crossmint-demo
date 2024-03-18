import pino from 'pino';
import config from './config';

const log = pino({
  level: config.log.level,
  transport: {
    target: 'pino-pretty',
  },
  nestedKey: 'payload',
});

export default log;
