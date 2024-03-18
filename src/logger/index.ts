import pino from 'pino';
import config from '../config';

const logger = pino({
  level: config.log.level,
  transport: {
    target: 'pino-pretty',
  },
  nestedKey: 'payload',
});

export default logger;
