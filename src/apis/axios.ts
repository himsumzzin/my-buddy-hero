import axios, {
  AxiosError,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';

export interface AxiosRetryOption {
  retry: number;
  retryDelay: number;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

interface CustomAxiosError extends AxiosError {
  config: CustomAxiosRequestConfig;
}

const DEFAULT_RETRY_COUNT = 3;
const DEFAULT_RETRY_DELAY = 1000;
const customConfig = {
  retry: DEFAULT_RETRY_COUNT,
} as CreateAxiosDefaults;

export const AxiosWithRetry = axios.create(customConfig);

// AxiosWithRetry.defaults.retry = DEFAULT_RETRY_COUNT as number;
AxiosWithRetry.interceptors.response.use(undefined, (err: CustomAxiosError) => {
  const { config, message } = err;

  // config인수를 넘겨주지 않은 경우 에러 반환
  if (!config) {
    return Promise.reject(err);
  }
  // retry횟수를 초과한 경우 초기화하고 에러 반환
  if (!config.retry) {
    config.retry = DEFAULT_RETRY_COUNT;
    return Promise.reject(err);
  }

  // Network timeout or Network Error가 아닌 경우 그대로 에러 반환
  if (
    !(
      message.toLowerCase().includes('timeout') ||
      message.toLowerCase().includes('network error')
    )
  ) {
    return Promise.reject(err);
  }

  config.retry -= 1;

  // 딜레이 시간이 지나면 기존 옵션대로 재시도
  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, config.retryDelay || DEFAULT_RETRY_DELAY);
  });
  // 기존 요청을 재전송
  return delayRetryRequest.then(() => AxiosWithRetry(config));
});
