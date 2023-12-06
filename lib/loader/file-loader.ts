import type { OptionsSync } from 'cosmiconfig';
import { basename, dirname } from 'path';
import { debug } from '../utils/debug.util';
import { loadPackage } from '../utils/load-package.util';

const DEFAULT_VALUE_SEPARATOR = ':-';

let parseToml: any;
let cosmiconfig: any;

const loadToml = function loadToml(filepath: string, content: string) {
  parseToml = loadPackage(
    '@iarna/toml',
    "fileLoader's ability to parse TOML files",
  ).parse;
  try {
    const result = parseToml(content);
    return result;
  } catch (error: any) {
    error.message = `TOML Error in ${filepath}:\n${error.message}`;
    throw error;
  }
};

export interface FileLoaderOptions extends Partial<OptionsSync> {
  /**
   * basename of config file, defaults to `.env`.
   *
   * In other words, `.env.yaml`, `.env.yml`, `.env.json`, `.env.toml`, `.env.js`
   * will be searched by default.
   */
  basename?: string;
  /**
   * Use given file directly, instead of recursively searching in directory tree.
   */
  absolutePath?: string;
  /**
   * The directory to search from, defaults to `process.cwd()`. See: https://github.com/davidtheclark/cosmiconfig#explorersearch
   */
  searchFrom?: string;
  /**
   * If "true", ignore environment variable substitution.
   * Default: true
   */
  ignoreEnvironmentVariableSubstitution?: boolean;
  /**
   * If "true", disallow undefined environment variables.
   * Default: true
   */
  disallowUndefinedEnvironmentVariables?: boolean;
}

const getSearchOptions = (options: FileLoaderOptions) => {
  if (options.absolutePath) {
    return {
      searchPlaces: [basename(options.absolutePath)],
      searchFrom: dirname(options.absolutePath),
    };
  }
  const { basename: name = '.env', loaders = {} } = options;
  const additionalFormats = Object.keys(loaders).map(ext => ext.slice(1));

  const formats = [...additionalFormats, 'toml', 'yaml', 'yml', 'json', 'js'];
  return {
    searchPlaces: [
      ...formats.map(format => `${name}.${process.env.NODE_ENV}.${format}`),
      ...formats.map(format => `${name}.${format}`),
    ],
    searchFrom: options.searchFrom,
  };
};

/**
 * File loader loads configuration with `cosmiconfig` from file system.
 *
 * It is designed to be easy to use by default:
 *  1. Searching for configuration file starts at `process.cwd()`, and continues
 *     to search up the directory tree until it finds some acceptable configuration.
 *  2. Various extensions are supported, such as `.json`, `.yaml`, `.toml`, `.js` and `.cjs`.
 *  3. Configuration base name defaults to .env (so the full name is `.env.json` or `.env.yaml`),
 *     separate file for each environment is also supported. For example, if current `NODE_ENV` is
 *     development, `.env.development.json` has higher priority over `.env.json`.
 *
 * @see https://github.com/davidtheclark/cosmiconfig
 * @param options cosmiconfig initialize options. See: https://github.com/davidtheclark/cosmiconfig#cosmiconfigoptions
 */
export const fileLoader = (
  options: FileLoaderOptions = {},
): (() => Record<string, any>) => {
  cosmiconfig = loadPackage('cosmiconfig', 'fileLoader');

  const { cosmiconfigSync } = cosmiconfig;
  return (additionalContext: Record<string, any> = {}): Record<string, any> => {
    const { searchPlaces, searchFrom } = getSearchOptions(options);
    const loaders = {
      '.toml': loadToml,
      ...options.loaders,
    };
    const explorer = cosmiconfigSync('env', {
      searchPlaces,
      ...options,
      loaders,
      transform: (result: Record<string, any> | null) => {
        if (
          !result ||
          (options.ignoreEnvironmentVariableSubstitution ?? true)
        ) {
          return result;
        }

        try {
          const updatedResult = transformFileLoaderResult(
            result.config,
            {
              // additionalContext must be first so the actual config will override it
              ...additionalContext,
              ...result.config,
              ...process.env,
            },
            options.disallowUndefinedEnvironmentVariables ?? true,
          );

          result.config = updatedResult;
          return result;
        } catch (error: any) {
          // enrich error with options information
          error.details = options;
          throw error;
        }
      },
    });
    const result = explorer.search(searchFrom);

    if (!result) {
      throw new Error(`Failed to find configuration file.`);
    }

    debug(
      `File-loader has loaded a configuration file from ${result.filepath}`,
    );

    return result.config;
  };
};

function resolveReference(
  reference: string,
  currentContext: Record<string, any>,
): Record<string, any> | string | number | null {
  const parts = reference.split('.');
  let value = currentContext;

  for (const part of parts) {
    value = value[part];
    if (value === undefined) {
      return null;
    }
  }

  return value;
}

function transformFileLoaderResult(
  obj: Record<string, any> | string | number,
  context: Record<string, any>,
  disallowUndefinedEnvironmentVariables: boolean,
  visited = new Set<Record<string, any> | string | number>(),
): Record<string, any> | string | number {
  if (typeof obj === 'string') {
    const match = obj.match(/\$\{(.+?)\}/g);
    if (match) {
      for (const placeholder of match) {
        const { variable, defaultValue } =
          extractVariableNameAndDefaultValue(placeholder);

        let resolvedValue = resolveReference(variable, context);

        if (obj === resolvedValue) {
          throw new Error(
            `Circular self reference detected: ${obj} -> ${resolvedValue}`,
          );
        }

        if (resolvedValue !== null) {
          if (typeof resolvedValue === 'string') {
            // resolve reference first
            if (resolvedValue.match(/(?!(?<=\\))\$\{(.+?)\}/)) {
              try {
                resolvedValue = transformFileLoaderResult(
                  resolvedValue,
                  context,
                  disallowUndefinedEnvironmentVariables,
                  visited,
                );
              } catch (error) {
                if (error instanceof RangeError) {
                  debug(
                    `Can not resolve a circular reference in ${obj} -> ${resolvedValue} -> ${error.message}`,
                    error,
                  );
                }

                throw error;
              }
            }

            obj = obj.toString().replace(placeholder, resolvedValue.toString());
          } else if (typeof resolvedValue === 'object') {
            obj = transformFileLoaderResult(
              obj,
              resolvedValue,
              disallowUndefinedEnvironmentVariables,
              visited,
            );
          } else if (
            typeof resolvedValue === 'number' ||
            typeof resolvedValue === 'boolean'
          ) {
            // if it's one to one reference, just return it as a number
            if (obj === placeholder) {
              obj = resolvedValue;
            } else {
              //   this means that we're embedding some number into string
              obj = obj
                .toString()
                .replace(placeholder, resolvedValue.toString());
            }
          }
        } else if (defaultValue !== undefined) {
          obj = defaultValue;
        } else if (disallowUndefinedEnvironmentVariables) {
          throw new Error(
            `Environment variable is not set for variable name: '${variable}'`,
          );
        }
      }
    }
  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  } else if (typeof obj === 'object' && obj !== null) {
    /**
     * it's not really possible to have circular reference in JSON and yaml like this
     * but probably one day there will be more complex scenarios for this function
     */
    /* istanbul ignore next */
    if (visited.has(obj)) {
      return obj; // Avoid infinite loops on circular references
    }
    visited.add(obj);

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = transformFileLoaderResult(
          obj[i],
          context,
          disallowUndefinedEnvironmentVariables,
          visited,
        );
      }
    } else {
      for (const key in obj) {
        obj[key] = transformFileLoaderResult(
          obj[key],
          context,
          disallowUndefinedEnvironmentVariables,
          visited,
        );
      }
    }

    visited.delete(obj);
  }
  return obj;
}

function extractVariableNameAndDefaultValue(placeholder: string): {
  variable: string;
  defaultValue?: string;
} {
  const placeholderWithoutBrackets = placeholder.slice(2, -1);
  const splitValues = placeholderWithoutBrackets.split(DEFAULT_VALUE_SEPARATOR);
  const defaultValue =
    splitValues.length === 1
      ? undefined
      : splitValues.slice(1).join(DEFAULT_VALUE_SEPARATOR);

  return {
    variable: splitValues[0],
    defaultValue,
  };
}
