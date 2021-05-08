import { HttpService } from '@nestjs/common';
import { parse as parseToml } from '@iarna/toml';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import parseJson from 'parse-json';
import { parse as parseYaml } from 'yaml';
import { delay, map, retryWhen, take } from 'rxjs/operators';
import { identity } from '../utils/identity.util';

type AxiosRequestConfigWithoutUrl = Omit<AxiosRequestConfig, 'url'>;

export type RemoteLoaderConfigType = 'json' | 'yaml' | 'toml' | 'yml';

export interface RemoteLoaderOptions extends AxiosRequestConfigWithoutUrl {
  /**
   * Config file type
   */
  type?: ((response: any) => RemoteLoaderConfigType) | RemoteLoaderConfigType;

  /**
   * A function that maps http response body to corresponding config object
   */
  mapResponse?: (config: any) => Promise<any> | any;

  /**
   * A function that determines if the request should be retried
   */
  shouldRetry?: (response: AxiosResponse) => boolean;

  /**
   * Number of retries to perform, defaults to 3
   */
  retries?: number;

  /**
   * Interval in milliseconds between each retry
   */
  retryInterval?: number;
}

/**
 * Async loader loads configuration at remote endpoint.
 *
 * @param url Remote location of configuration
 * @param options options to configure async loader, support all `axios` options
 */
export const remoteLoader = <T = any>(
  url: string,
  options: RemoteLoaderOptions = {},
) => {
  return async (): Promise<T> => {
    const {
      mapResponse = identity,
      type,
      shouldRetry = () => false,
      retryInterval = 3000,
      retries = 3,
    } = options;

    const httpService = new HttpService(axios.create());

    const config = await httpService
      .request<T>({
        url,
        ...options,
      })
      .pipe(
        map(response => {
          if (shouldRetry(response)) {
            throw new Error(
              `Error when fetching config, response.data: ${JSON.stringify(
                response.data,
              )}`,
            );
          }
          return mapResponse(response.data);
        }),
        retryWhen(errors => {
          let retryCount = 0;
          return errors.pipe(
            delay(retryInterval),
            map(error => {
              if (retryCount >= retries) {
                throw new Error(
                  `Fetch config with remote-loader failed, as the number of retries has been exhausted. ${error.message}`,
                );
              }
              retryCount += 1;
              return error;
            }),
            take(retries + 1),
          );
        }),
      )
      .toPromise();

    const parser = {
      json: (content: string) => parseJson(content),
      yaml: (content: string) => parseYaml(content),
      yml: (content: string) => parseYaml(content),
      toml: (content: string) => parseToml(content),
    };

    const realType = typeof type === 'function' ? type(config) : type;
    if (typeof config === 'string' && realType && parser[realType]) {
      return parser[realType](config);
    }

    return config;
  };
};
