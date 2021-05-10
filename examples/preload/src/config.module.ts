import { TypedConfigModule, fileLoader, selectConfig } from 'nest-typed-config';
import { RootConfig } from './config';

export const ConfigModule = TypedConfigModule.forRoot({
  schema: RootConfig,
  load: fileLoader(),
});

export const rootConfig = selectConfig(ConfigModule, RootConfig);
