import { Module, DynamicModule, Provider } from '@nestjs/common';
import { red, yellow, cyan, blue } from 'chalk';
import { ClassConstructor, plainToClass } from 'class-transformer';
import {
  validateSync,
  ValidationError,
  ValidatorOptions,
} from 'class-validator';
import { identity } from 'lodash';
import { TypedConfigModuleOptions } from './interfaces/typed-config-module-options.interface';
import { forEachDeep } from './utils/for-each-deep.util';

@Module({})
export class TypedConfigModule {
  static async forRoot(
    options: TypedConfigModuleOptions,
  ): Promise<DynamicModule> {
    const {
      load,
      schema: Config,
      normalize = identity,
      validationOptions,
      isGlobal,
      validate = this.validateWithClassValidator.bind(this),
    } = options;

    const rawConfig = await load();
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
    const config = plainToClass(Config, rawConfig);
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

  private static getConfigErrorMessage(errors: ValidationError[]) {
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
