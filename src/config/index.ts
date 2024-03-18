import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  candidateId: process.env.CANDIDATE_ID,
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  api: {
    baseUrl: process.env.API_URL,
    timeout: 15000,
    retries: 5,
    delayFactor: 2000,
  },
  service: {
    concurrency: 2,
  },
};

export default config;
