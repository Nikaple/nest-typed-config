import type { OptionsSync } from 'cosmiconfig';
import { readdirSync } from 'fs';
import { fileLoader } from './file-loader';
import fromPairs from 'lodash.frompairs';

export interface DirectoryLoaderOptions extends OptionsSync {
  /**
   * The directory containing all configuration files.
   */
  directory: string;
  /**
   * File regex to include.
   */
  include?: RegExp;
  /**
   * If "true", ignore environment variable substitution.
   * Default: true
   */
  ignoreEnvironmentVariableSubstitution?: boolean;
}

/**
 * Directory loader loads configuration in a specific folder.
 * The basename of file will be used as configuration key, for the directory below:
 *
 * ```
 * .
 * └─config
 *    ├── app.toml
 *    └── db.toml
 * ```
 *
 * The parsed config will be `{ app: "config in app.toml", db: "config in db.toml" }`
 * @param options directory loader options.
 */
export const directoryLoader = ({
  directory,
  ...options
}: DirectoryLoaderOptions) => {
  return (): Record<string, any> => {
    const files = readdirSync(directory).filter(fileName =>
      options.include ? options.include.test(fileName) : true,
    );
    const fileNames = [
      ...new Set(files.map(file => file.replace(/\.\w+$/, ''))),
    ];
    const configs = fromPairs(
      fileNames.map(name => [
        name,
        fileLoader({
          basename: name,
          searchFrom: directory,
          ...options,
        })(),
      ]),
    );

    return configs;
  };
};
