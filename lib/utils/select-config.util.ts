import { DynamicModule, ValueProvider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export interface SelectConfigOptions {
  /**
   * when true, allow undefined config declared with `@IsOptional()`
   */
  allowOptional?: boolean;
}

export const selectConfig = <T, Option extends SelectConfigOptions>(
  module: DynamicModule,
  Config: ClassConstructor<T>,
  options?: Option,
): Option extends { allowOptional: true } ? T | undefined : T => {
  const providers = module.providers as ValueProvider<T>[];
  const selectedConfig = (providers || []).filter(
    ({ provide }) => provide === Config,
  )[0];
  if (options?.allowOptional) {
    return selectedConfig?.useValue;
  }
  if (!selectedConfig) {
    throw new Error(
      'You can only select config which exists in providers. \
      If the config being selected is marked as optional, \
      please pass `allowOptional` in options argument.',
    );
  }
  return selectedConfig.useValue;
};
