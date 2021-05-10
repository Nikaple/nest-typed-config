import { DynamicModule, ValueProvider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export const selectConfig = <T>(
  module: DynamicModule,
  Config: ClassConstructor<T>,
): T => {
  const providers = module.providers as ValueProvider<T>[];
  const selectedConfig = (providers || []).filter(
    ({ provide }) => provide === Config,
  )[0];
  if (!selectedConfig) {
    throw new Error(`You can only select config which exists in providers`);
  }
  return selectedConfig.useValue;
};
