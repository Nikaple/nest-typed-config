import { ClassConstructor } from 'class-transformer';
import { ValidatorOptions } from 'class-validator';

export type ConfigLoader = () =>
  | Promise<Record<string, any>>
  | Record<string, any>;

export interface TypedConfigModuleOptions {
  /**
   * The root object for application configuration.
   */
  schema: ClassConstructor<any>;

  /**
   * Function to load configurations, can be sync or async.
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
