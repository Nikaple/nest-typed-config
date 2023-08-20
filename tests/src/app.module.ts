import { DynamicModule, Module } from '@nestjs/common';
import { join } from 'path';
import { parse as parseYaml } from 'yaml';
import {
  directoryLoader,
  fileLoader,
  FileLoaderOptions,
  remoteLoader,
  RemoteLoaderOptions,
  TypedConfigModule,
} from '../../lib';
import {
  dotenvLoader,
  DotenvLoaderOptions,
} from '../../lib/loader/dotenv-loader';
import {
  BazConfig,
  Config,
  ConfigWithDefaultValues,
  DirectoryConfig,
  FooConfig,
  TableConfig,
} from './config.model';
import { ClassConstructor } from 'class-transformer';

const loadYaml = function loadYaml(filepath: string, content: string) {
  try {
    const result = parseYaml(content);
    return result;
  } catch (error: any) {
    error.message = `YAML Error in ${filepath}:\n${error.message}`;
    throw error;
  }
};

export type TestYamlFile =
  | '.env.sub.yaml'
  | '.env-advanced.sub.yaml'
  | '.env-object-cross-referencing.sub.yaml'
  | '.env-advanced-self-referencing-tricky.sub.yaml'
  | '.env-advanced-chain-reference-wrong-value.sub.yaml'
  | '.env-second-with-hardcoded-host-file.sub.yaml'
  | '.env-field-name-the-same-as-env.sub.yaml'
  | '.env-circular-between2.sub.yaml'
  | '.env-circular-between3.sub.yaml'
  | '.env-second-file.sub.yaml'
  | '.env-self-reference.sub.yaml'
  | '.env-reference-array-of-objects.sub.yaml'
  | '.env-reference-object.sub.yaml'
  | '.env-reference-array-of-primitives.sub.yaml'
  | '.env-advanced-backward-reference.sub.yaml'
  | '.env-with-default.sub.yaml';

@Module({})
export class AppModule {
  static withMultipleLoaders(
    loaderTypes: ('reject' | 'part1' | 'part2')[],
    async = true,
  ): DynamicModule {
    const loaders = loaderTypes.map(type => {
      if (type === 'reject') {
        return () => {
          throw new Error('Not found');
        };
      }
      if (type === 'part1') {
        return fileLoader({
          searchFrom: __dirname,
          basename: '.env.part1',
        });
      }
      if (type === 'part2') {
        return fileLoader({
          searchFrom: __dirname,
          basename: '.env.part2',
        });
      }
      throw new Error('not valid type');
    });
    return {
      module: AppModule,
      imports: [
        TypedConfigModule[async ? 'forRootAsync' : 'forRoot']({
          schema: Config,
          load: loaders,
        }),
      ],
    };
  }

  static withMultipleSchemas(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: FooConfig,
          load: dotenvLoader({
            envFilePath: join(__dirname, '../src/.env.part1'),
          }),
        }),
        TypedConfigModule.forRoot({
          schema: BazConfig,
          load: dotenvLoader({
            envFilePath: join(__dirname, '../src/.env.part2'),
          }),
        }),
      ],
    };
  }

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

  static withDirectory(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: DirectoryConfig,
          load: directoryLoader({
            directory: join(__dirname, 'dir'),
          }),
        }),
      ],
    };
  }

  static withDirectoryInclude(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: DirectoryConfig,
          load: directoryLoader({
            directory: join(__dirname, 'dir2'),
            include: /\.toml$/,
          }),
        }),
      ],
    };
  }

  static withRawModule(): DynamicModule {
    return TypedConfigModule.forRoot({
      schema: Config,
      load: fileLoader({
        absolutePath: join(__dirname, '.env.toml'),
      }),
    });
  }

  static withSpecialFormat(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: Config,
          load: fileLoader({
            basename: '.config',
            loaders: {
              '.special': loadYaml,
            },
            searchFrom: __dirname,
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
        TypedConfigModule.forRootAsync({
          schema: Config,
          load: () => 'string' as any,
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

  static withYamlSubstitution(
    options: FileLoaderOptions,
    schema: ClassConstructor<any> = Config,
    fileNames: Array<TestYamlFile> = ['.env.sub.yaml'],
  ): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema,
          load: fileNames.map(f =>
            fileLoader({
              absolutePath: join(__dirname, f),
              ...options,
            }),
          ),
        }),
      ],
    };
  }

  static withDirectorySubstitution(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: DirectoryConfig,
          load: directoryLoader({
            directory: join(__dirname, 'dir_sub'),
            ignoreEnvironmentVariableSubstitution: false,
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
        TypedConfigModule.forRootAsync({
          schema: Config,
          load: remoteLoader('http://localhost', loaderOptions),
        }),
      ],
    };
  }

  static withConfigWithDefaultValues(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: ConfigWithDefaultValues,
          load: dotenvLoader(),
          normalize(config) {
            return {
              propertyWithDefaultValue: config.UNDEFINED_ENV_PROPERTY,
            };
          },
        }),
      ],
    };
  }
}
