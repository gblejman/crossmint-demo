import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import config from '../config';
import logger from '../logger';

const log = logger.child({ module: 'api' });

const extractConfig = (config: AxiosRequestConfig) => {
  const { method, baseURL = '', url, params, data } = config;
  return { method, url: baseURL + url, params, data };
};

const client = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
});

client.interceptors.request.use(
  (config) => {
    log.debug(extractConfig(config), 'request');
    return config;
  },
  (error) => {
    log.error(error.message, 'request error');
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    log.error(error.message, 'response error');
    return Promise.reject(error);
  }
);

axiosRetry(client, {
  retries: config.api.retries,
  // Handle 429 - Too many requests
  retryCondition: (e) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(e) || e.response?.status === 429;
  },
  retryDelay: (retryCount) => {
    const delay = 2 ** retryCount * config.api.delayFactor;
    // 0-20% of the delay
    const randomSum = delay * 0.2 * Math.random();
    return delay + randomSum;
  },
  onRetry: (retryCount, error, config) => {
    log.warn(
      {
        // error: extractError(error),
        config: extractConfig(config),
        retryCount,
      },
      'retry'
    );
  },
  shouldResetTimeout: true,
});

export default client;
