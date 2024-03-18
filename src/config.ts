import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  candidateId: process.env.CANDIDATE_ID,
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  api: {
    baseUrl: process.env.API_URL,
  },
};

export default config;
