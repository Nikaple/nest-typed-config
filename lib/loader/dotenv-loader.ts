/**
 * Parts of this file come from the official config module for Nest.js
 *
 * @see https://github.com/nestjs/config/blob/master/lib/config.module.ts
 */

import * as fs from 'fs';
import { resolve } from 'path';
import set from 'set-value';
import { loadPackage } from '../utils/load-package.util';
import { debug } from '../utils/debug.util';

export interface DotenvLoaderOptions {
  /**
   * If set, use the separator to parse environment variables to objects.
   *
   * @example
   *
   * ```bash
   * app__port=8080
   * db__host=127.0.0.1
   * db__port=3000
   * ```
   *
   * if `separator` is set to `__`, environment variables above will be parsed as:
   *
   * ```json
   * {
   *     "app": {
   *         "port": 8080
   *     },
   *     "db": {
   *         "host": "127.0.0.1",
   *         "port": 3000
   *     }
   * }
   * ```
   */
  separator?: string;

  /**
   * If set, this function will transform all environment variable keys prior to parsing.
   *
   * Be aware: If you transform multiple keys to the same value only one will remain!
   *
   * @example
   *
   * .env file: `PORT=8080` and `keyTransformer: key => key.toLowerCase()` results in `{"port": 8080}`
   *
   * @param key environment variable key
   */
  keyTransformer?: (key: string) => string;

  /**
   * If "true", environment files (`.env`) will be ignored.
   */
  ignoreEnvFile?: boolean;

  /**
   * If "true", predefined environment variables will not be validated.
   */
  ignoreEnvVars?: boolean;

  /**
   * Path to the environment file(s) to be loaded.
   */
  envFilePath?: string | string[];

  /**
   * A boolean value indicating the use of expanded variables.
   * If .env contains expanded variables, they'll only be parsed if
   * this property is set to true.
   *
   * Internally, dotenv-expand is used to expand variables.
   */
  expandVariables?: boolean;
}

let dotenv: any;
let dotenvExpand: any;

const loadEnvFile = (options: DotenvLoaderOptions): Record<string, any> => {
  dotenv = loadPackage('dotenv', 'dotenvLoader');
  const envFilePaths = Array.isArray(options.envFilePath)
    ? options.envFilePath
    : [options.envFilePath || resolve(process.cwd(), '.env')];

  let config: Record<string, string> = {};
  for (const envFilePath of envFilePaths) {
    if (fs.existsSync(envFilePath)) {
      config = Object.assign(
        dotenv.parse(fs.readFileSync(envFilePath)),
        config,
      );
      if (options.expandVariables) {
        dotenvExpand = loadPackage(
          'dotenv-expand',
          "dotenvLoader's ability to expandVariables",
        );
        config = dotenvExpand.expand({ parsed: config }).parsed!;
      }
    }

    Object.entries(config).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = value;
      } else {
        debug(
          `"${key}" is already defined in \`process.env\` and will not be overwritten`,
        );
      }
    });
  }
  return config;
};

/**
 * Dotenv loader loads configuration with `dotenv`.
 *
 */
export const dotenvLoader = (options: DotenvLoaderOptions = {}) => {
  return (): Record<string, any> => {
    const { separator, keyTransformer, ignoreEnvFile, ignoreEnvVars } = options;

    let config = ignoreEnvFile ? {} : loadEnvFile(options);

    if (!ignoreEnvVars) {
      config = {
        ...config,
        ...process.env,
      };
    }

    if (keyTransformer !== undefined) {
      config = Object.entries(config).reduce<Record<string, any>>(
        (acc, [key, value]) => {
          acc[keyTransformer(key)] = value;
          return acc;
        },
        {},
      );
    }

    if (typeof separator === 'string') {
      const temp = {};
      Object.entries(config).forEach(([key, value]) => {
        set(temp, key.split(separator), value);
      });
      config = temp;
    }

    return config;
  };
};
