import axios, { AxiosRequestConfig } from 'axios';
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
    log.error(error, 'request error');
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    log.error(error, 'response error');
    return Promise.reject(error);
  }
);

export default client;
