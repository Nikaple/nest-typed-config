import type { OptionsSync } from 'cosmiconfig';
import { basename, dirname } from 'path';
import { debug } from '../utils/debug.util';
import { loadPackage } from '../utils/load-package.util';

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
 * Will fill in some placeholders.
 * @param template - Text with placeholders for `data` properties.
 * @param data - Data to interpolate into `template`.
 *
 * @example
 ```
 placeholderResolver('Hello ${name}', {
    name: 'John',
  });
 //=> 'Hello John'
 ```
 */
const placeholderResolver = (
  template: string,
  data: Record<string, any>,
): string => {
  const replace = (placeholder: any, key: string) => {
    let value = data;
    for (const property of key.split('.')) {
      value = value ? value[property] : undefined;
    }

    return String(value);
  };

  // The regex tries to match either a number inside `${{ }}` or a valid JS identifier or key path.
  const braceRegex = /\${(\d+|[a-z$_][\w\-$]*?(?:\.[\w\-$]*?)*?)}/gi;

  return template.replace(braceRegex, replace);
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
  return (): Record<string, any> => {
    const { searchPlaces, searchFrom } = getSearchOptions(options);
    const loaders = {
      '.toml': loadToml,
      ...options.loaders,
    };
    const explorer = cosmiconfigSync('env', {
      searchPlaces,
      ...options,
      loaders,
    });
    const result = explorer.search(searchFrom);

    if (!result) {
      throw new Error(`Failed to find configuration file.`);
    }

    debug(
      `File-loader has loaded a configuration file from ${result.filepath}`,
    );

    const replacedConfig = placeholderResolver(
      JSON.stringify(result.config),
      process.env,
    );
    return JSON.parse(replacedConfig);
  };
};
