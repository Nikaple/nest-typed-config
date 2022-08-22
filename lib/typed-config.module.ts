import { Module, DynamicModule, Provider } from '@nestjs/common';
import { red, yellow, cyan, blue } from 'chalk';
import type { ClassConstructor } from 'class-transformer';
import type { ValidatorOptions, ValidationError } from 'class-validator';
import merge from 'lodash.merge';
import {
  TypedConfigModuleAsyncOptions,
  TypedConfigModuleOptions,
} from './interfaces/typed-config-module-options.interface';
import { forEachDeep } from './utils/for-each-deep.util';
import { identity } from './utils/identity.util';
import { debug } from './utils/debug.util';
import { validateSync, plainToClass } from './utils/imports.util';

@Module({})
export class TypedConfigModule {
  public static forRoot(options: TypedConfigModuleOptions): DynamicModule {
    const rawConfig = this.getRawConfig(options.load);

    return this.getDynamicModule(options, rawConfig);
  }

  public static async forRootAsync(
    options: TypedConfigModuleAsyncOptions,
  ): Promise<DynamicModule> {
    const rawConfig = await this.getRawConfigAsync(options.load);

    return this.getDynamicModule(options, rawConfig);
  }

  private static getDynamicModule(
    options: TypedConfigModuleOptions | TypedConfigModuleAsyncOptions,
    rawConfig: Record<string, any>,
  ) {
    const {
      schema: Config,
      normalize = identity,
      validationOptions,
      isGlobal = true,
      validate = this.validateWithClassValidator.bind(this),
    } = options;

    if (typeof rawConfig !== 'object') {
      throw new Error(
        `Configuration should be an object, received: ${rawConfig}. Please check the return value of \`load()\``,
      );
    }
    const normalized = normalize(rawConfig);
    const config = validate(normalized, Config, validationOptions);
    const providers = this.getProviders(config, Config);

    return {
      global: isGlobal,
      module: TypedConfigModule,
      providers,
      exports: providers,
    };
  }

  private static getRawConfig(load: TypedConfigModuleOptions['load']) {
    if (Array.isArray(load)) {
      const config = {};
      for (const fn of load) {
        try {
          const conf = fn();
          merge(config, conf);
        } catch (err: any) {
          debug(`Config load failed: ${err.message}`);
        }
      }
      return config;
    }
    return load();
  }

  private static async getRawConfigAsync(
    load: TypedConfigModuleAsyncOptions['load'],
  ) {
    if (Array.isArray(load)) {
      const config = {};
      for (const fn of load) {
        try {
          const conf = await fn();
          merge(config, conf);
        } catch (err: any) {
          debug(`Config load failed: ${err.message}`);
        }
      }
      return config;
    }
    return load();
  }

  private static getProviders(
    config: any,
    Config: ClassConstructor<any>,
  ): Provider[] {
    const providers: Provider[] = [
      {
        provide: Config,
        useValue: config,
      },
    ];
    forEachDeep(config, value => {
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value.constructor !== Object
      ) {
        providers.push({ provide: value.constructor, useValue: value });
      }
    });

    return providers;
  }

  private static validateWithClassValidator(
    rawConfig: any,
    Config: ClassConstructor<any>,
    options?: Partial<ValidatorOptions>,
  ) {
    const config = plainToClass(Config, rawConfig, {
      exposeDefaultValues: true,
    });
    // defaults to strictest validation rules
    const schemaErrors = validateSync(config, {
      forbidUnknownValues: true,
      whitelist: true,
      ...options,
    });
    if (schemaErrors.length > 0) {
      const configErrorMessage = this.getConfigErrorMessage(schemaErrors);
      throw new Error(configErrorMessage);
    }
    return config;
  }

  static getConfigErrorMessage(errors: ValidationError[]): string {
    const messages = this.formatValidationError(errors)
      .map(({ property, value, constraints }) => {
        const constraintMessage = Object.entries(
          constraints || /* istanbul ignore next */ {},
        )
          .map(
            ([key, val]) =>
              `    - ${key}: ${yellow(val)}, current config is \`${blue(
                JSON.stringify(value),
              )}\``,
          )
          .join(`\n`);
        const msg = [
          `  - config ${cyan(property)} does not match the following rules:`,
          `${constraintMessage}`,
        ].join(`\n`);
        return msg;
      })
      .filter(Boolean)
      .join(`\n`);
    const configErrorMessage = red(
      `Configuration is not valid:\n${messages}\n`,
    );
    return configErrorMessage;
  }

  /**
   * Transforms validation error object returned by class-validator to more
   * readable error messages.
   */
  private static formatValidationError(errors: ValidationError[]) {
    const result: {
      property: string;
      constraints: ValidationError['constraints'];
      value: ValidationError['value'];
    }[] = [];
    const helper = (
      { property, constraints, children, value }: ValidationError,
      prefix: string,
    ) => {
      const keyPath = prefix ? `${prefix}.${property}` : property;
      if (constraints) {
        result.push({
          property: keyPath,
          constraints,
          value,
        });
      }
      if (children && children.length) {
        children.forEach(child => helper(child, keyPath));
      }
    };
    errors.forEach(error => helper(error, ``));
    return result;
  }
}
