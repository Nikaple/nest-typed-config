import { ClassConstructor } from 'class-transformer';
import { ValidatorOptions } from 'class-validator';

export type ConfigLoader = () => Record<string, any>;
export type AsyncConfigLoader = () => Promise<Record<string, any>>;

export interface TypedConfigModuleOptions {
  /**
   * The root object for application configuration.
   */
  schema: ClassConstructor<any>;

  /**
   * Function(s) to load configurations, must be synchronous.
   */
  load: ConfigLoader | ConfigLoader[];

  /**
   * Defaults to "true".
   *
   * If "true", registers `ConfigModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;

  /**
   * Custom function to normalize configurations. It takes an object containing environment
   * variables as input and outputs normalized configurations.
   *
   * This function is executed before validation, and can be used to do type casting,
   * variable expanding, etc.
   */
  normalize?: (config: Record<string, any>) => Record<string, any>;

  /**
   * Custom function to validate configurations. It takes an object containing environment
   * variables as input and outputs validated configurations.
   * If exception is thrown in the function it would prevent the application from bootstrapping.
   */
  validate?: (config: Record<string, any>) => Record<string, any>;

  /**
   * Options passed to validator during validation.
   * @see https://github.com/typestack/class-validator
   */
  validationOptions?: ValidatorOptions;
}

export interface TypedConfigModuleAsyncOptions
  extends TypedConfigModuleOptions {
  /**
   * Function(s) to load configurations, can be synchronous or asynchronous.
   */
  load: ConfigLoader | AsyncConfigLoader | (ConfigLoader | AsyncConfigLoader)[];
}

export class PlaceholderMissingValueError extends Error {
  name: 'MissingValueError';
  key: string;

  constructor(key: string) {
    super(
      `Missing a value for ${
        key ? `the placeholder: ${key}` : 'a placeholder'
      }`,
    );
    this.name = 'MissingValueError';
    this.key = key;
  }
}

export type PlaceholderOptions = {
  /**
   By default, throws a `MissingValueError` when a placeholder resolves to `undefined`. With this option set to `true`, it simply ignores it and leaves the placeholder as is.
   @default false
   */
  ignoreMissing?: boolean;
  /**
   Performs arbitrary operation for each interpolation. If the returned value was `undefined`, it behaves differently depending on the `ignoreMissing` option. Otherwise, the returned value will be interpolated into a string (and escaped when double-braced) and embedded into the template.
   @default ({value}) => value
   */
  transform: (data: { value: unknown; key: string }) => unknown;
};
