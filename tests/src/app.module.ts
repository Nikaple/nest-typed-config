import { DynamicModule, Module } from '@nestjs/common';
import { join } from 'path';
import {
  remoteLoader,
  RemoteLoaderOptions,
  TypedConfigModule,
} from '../../lib';
import { fileLoader } from '../../lib';
import {
  dotenvLoader,
  DotenvLoaderOptions,
} from '../../lib/loader/dotenv-loader';
import { Config, TableConfig } from './config.model';

@Module({})
export class AppModule {
  static withToml(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: fileLoader({
            absolutePath: join(__dirname, '.env.toml'),
          }),
        }),
      ],
    };
  }

  static withErrorToml(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: fileLoader({
            absolutePath: join(__dirname, '.env.error.toml'),
          }),
        }),
      ],
    };
  }

  static withStringConfig(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: () => 'string',
        }),
      ],
    };
  }

  static withConfigNotFound(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: fileLoader(),
        }),
      ],
    };
  }

  static withValidationFailed(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: fileLoader({
            absolutePath: join(__dirname, '.env.invalid.toml'),
          }),
        }),
      ],
    };
  }

  static withNodeEnv(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: fileLoader({
            searchFrom: __dirname,
          }),
        }),
      ],
    };
  }

  static withDotenvNoOption(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: TableConfig,
          load: dotenvLoader(),
        }),
      ],
    };
  }

  static withDotenv(option?: DotenvLoaderOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: dotenvLoader(option),
          validationOptions: {
            forbidNonWhitelisted: false,
          },
          normalize(config) {
            config.isAuthEnabled = config.isAuthEnabled === 'true';
            config.database.port = parseInt(config.database.port, 10);
            return config;
          },
        }),
      ],
    };
  }

  static withRemoteConfig(loaderOptions?: RemoteLoaderOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: remoteLoader('http://localhost', loaderOptions),
        }),
      ],
    };
  }
}
