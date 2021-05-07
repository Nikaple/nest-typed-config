<h1 align="center">Nest-Typed-Config</h1>

<h3 align="center">Never write strings to read config again.</h3>

<p align="center">
<a href="https://www.npmjs.com/package/nest-typed-config"><img src="https://img.shields.io/npm/v/nest-typed-config.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nest-typed-config"><img src="https://img.shields.io/npm/l/nest-typed-config.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/nest-typed-config"><img src="https://img.shields.io/npm/dm/nest-typed-config.svg" alt="NPM Downloads" /></a>
<a href="https://www.npmjs.com/nestjs-config-module"><img src="https://github.com/Nikaple/nest-typed-config/workflows/build/badge.svg" alt="build" /></a>
<a href="https://coveralls.io/github/Nikaple/nest-typed-config?branch=main"><img src="https://coveralls.io/repos/github/Nikaple/nest-typed-config/badge.svg?branch=main" alt="Coverage" /></a>
</p>

## Features

- Provide a type-safe and intuitive way to config your [Nest](https://github.com/nestjs/nest) projects, just as smooth as request DTO.
- Load your configuration with environment variables, json/yaml/toml configuration files or remote endpoints.
- Validate your configuration with [class-validator](https://github.com/typestack/class-validator) and [class-transformer](https://github.com/typestack/class-transformer)
- Provide easy to use options by default, meanwhile everything is customizable.


## Installation

### Yarn

```bash
yarn add nest-typed-config
```

### NPM
```bash
$ npm i --save nest-typed-config
```

## Inspiration

There are various popular configuration modules for [Nest framework](https://github.com/nestjs/nest), such as the [official configuration module](https://github.com/nestjs/config), [nestjs-config](https://github.com/nestjsx/nestjs-config) and [nestjs-easyconfig](https://github.com/rubiin/nestjs-easyconfig). These modules can help to manage configurations, validate them, and load them through the `ConfigService`. But that's when type-safety is gone. For example:

```ts
// @nestjs/config, with type-casting
const dbUser = this.configService.get<string>('DATABASE_USER');
// nestjs-config, returns `any` type
const env = this.config.get('app.environment');
// nestjs-easyconfig, only string is supported
const value = this.config.get('key');
```

Writing type casting is a pain and hard to maintain, and it's common to use non-string configurations in real-world projects. This module aims to provide an intuitive and type-safe way to load, validate and use configurations. Just import any config model, and inject it with full TypeScript support. In a nutshell:

```ts
// config.ts
export class Config {
    @IsString()
    public readonly host!: string;

    @IsNumber()
    public readonly port!: number;
}

// app.service.ts
import { Config } from './config';

@Injectable()
export class AppService {
    constructor(private readonly config: Config) {}

    show() {
        console.log(`http://${this.config.host}:${this.config.port}`)
    }
}
```


## Quick Start

Let's define the configuration model first. It can be nested at arbitrary depth.

```ts
// config.ts
import { Allow } from 'class-validator';

// validator is omitted for simplicity
export class TableConfig {
    @Allow()
    public readonly name!: string;
}

export class DatabaseConfig {
    @Type(() => TableConfig)
    @Allow()
    public readonly table!: TableConfig;
}

export class RootConfig {
    @Type(() => DatabaseConfig)
    @Allow()
    public readonly database!: DatabaseConfig;
}
```

Then, add a configuration file such as `.env.yaml` under project root directory:

```yaml
database:
    table:
        name: example
```

After creating the configuration file, import `TypedConfigModule` and `fileLoader` to load configuration from file system.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypedConfigModule, fileLoader } from 'nest-typed-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootConfig } from './config';

// Register TypedConfigModule
@Module({
    imports: [
        TypedConfigModule.forRoot({
            schema: RootConfig,
            load: fileLoader(),
        }),
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
```

That's it! You can use any config or sub-config you defined as injectable services now!

```ts
// app.service.ts
import { Injectable } from '@nestjs/common';
import { RootConfig, DatabaseConfig, TableConfig } from './config';

@Injectable()
export class AppService {
    // inject any config or sub-config you like
    constructor(
        private config: RootConfig,
        private databaseConfig: DatabaseConfig,
        private tableConfig: TableConfig,
    ) {}

    // enjoy type safety!
    public show(): any {
        const out = [
            `root.name: ${this.config.name}`,
            `root.database.name: ${this.databaseConfig.name}`,
            `root.database.table.name: ${this.tableConfig.name}`,
        ].join('\n');

        return `${out}\n`;
    }
}
```

For a full example, please visit our [examples](https://github.com/Nikaple/nest-typed-config/tree/main/examples/basic) folder


## API

### TypedConfigModule.forRoot

```ts
export interface TypedConfigModuleOptions {
  /**
   * The root object for application configuration.
   */
  schema: ClassConstructor<any>;

  /**
   * Function to load configurations, can be sync or async.
   */
  load(): Promise<any> | any;

  /**
   * If "true", registers `TypedConfigModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;

  /**
   * Custom function to normalize configurations. It takes an object containing configurations
   * as input and outputs normalized configurations.
   *
   * This function is executed before validation, and can be used to do type casting,
   * variable expanding, etc.
   */
  normalize?: (config: Record<string, any>) => Record<string, any>;

  /**
   * Custom function to validate configurations. It takes an object containing environment
   * variables as input and outputs validated configurations.
   *
   * If exception is thrown in the function it would prevent the application from bootstrapping.
   */
  validate?: (config: Record<string, any>) => Record<string, any>;

  /**
   * Options passed to validator during validation.
   * @see https://github.com/typestack/class-validator
   */
  validationOptions?: ValidatorOptions;
}
```

## Using loaders

### Using dotenv loader

The `dotenvLoader` function allows you to load configuration with [dotenv](https://github.com/motdotla/dotenv), which is similar to the [official configuration module](https://github.com/nestjs/config). You can use this loader to load configuration from `.env` files or environment variables.

#### Example

```ts
TypedConfigModule.forRoot({
    schema: RootConfig,
    load: dotenvLoader({ /* options */ }),
})
```

#### Passing options

The `dotenvLoader` function optionally expects a `DotenvLoaderOptions` object as a first parameter:

```ts
export interface DotenvLoaderOptions {
    /**
     * If set, use the separator to parse environment variables to objects.
     *
     * @example
     *
     * ```bash
     * app__port=8080
     * db__host=127.0.0.1
     * db__port=3000
     * ```
     *
     * if `separator` is set to `__`, environment variables above will be parsed as:
     *
     * ```json
     * {
     *     "app": {
     *         "port": 8080
     *     },
     *     "db": {
     *         "host": "127.0.0.1",
     *         "port": 3000
     *     }
     * }
     * ```
     */
    separator?: string;

    /**
     * If "true", environment files (`.env`) will be ignored.
     */
    ignoreEnvFile?: boolean;

    /**
     * If "true", predefined environment variables will not be validated.
     */
    ignoreEnvVars?: boolean;

    /**
     * Path to the environment file(s) to be loaded.
     */
    envFilePath?: string | string[];

    /**
     * A boolean value indicating the use of expanded variables.
     * If .env contains expanded variables, they'll only be parsed if
     * this property is set to true.
     * 
     * Internally, dotenv-expand is used to expand variables.
     */
    expandVariables?: boolean;
}
```

### Using file loader

The `fileLoader` function allows you to load configuration with [cosmiconfig](https://github.com/davidtheclark/cosmiconfig). You can use this loader to load configuration from files with various extensions, such as `.json`, `.yaml`, `.toml` or `.js`.

By default, `fileLoader` searches for `.env.{ext}` (ext = json, yaml, toml, js) configuration file starting at `process.cwd()`, and continues to search up the directory tree until it finds some acceptable configuration (or hits the home directory). Moreover, configuration of current environment takes precedence over general configuration (`.env.development.toml` is loaded instead of `.env.toml` when `NODE_ENV=development`)

#### Example

```ts
TypedConfigModule.forRoot({
    schema: RootConfig,
    load: fileLoader({ /* options */ }),
})
```

#### Passing options

The `fileLoader` function optionally expects a `FileLoaderOptions` object as a first parameter:

```ts
import { Options } from 'cosmiconfig';

export interface FileLoaderOptions extends Partial<Options> {
    /**
     * Use given file directly, instead of recursively searching in directory tree.
     */
    absolutePath?: string;
    /**
     * The directory to search from, defaults to `process.cwd()`.
     * See: https://github.com/davidtheclark/cosmiconfig#explorersearch
     */
    searchFrom?: string;
}
```

If you want to add support for other extensions, you can use [`loaders`](https://github.com/davidtheclark/cosmiconfig#loaders) property provided by `cosmiconfig`:

```ts
TypedConfigModule.forRoot({
    schema: RootConfig,
    load: fileLoader({
        loaders: {
          '.ini': iniLoader
        }
    }),
})
```

### Using remote loader

The `remoteLoader` function allows you to load configuration from a remote endpoint, such as configuration center. Internally [`axios`](https://github.com/axios/axios) is used to perform http requests.

#### Example

```ts
TypedConfigModule.forRoot({
    schema: RootConfig,
    load: remoteLoader('http://localhost:8080', { /* options */ }),
})
```

#### Passing options

The `remoteLoader` function optionally expects a `RemoteLoaderOptions` object as a second parameter, which accepts all `axios` request configuration except `url`.

```ts
export interface RemoteLoaderOptions extends Omit<AxiosRequestConfig, 'url'>; {
    /**
     * Config file type
     */
    type?:  'json' | 'yaml' | 'toml';
    /**
     * A function that maps http response body to corresponding configuration object
     */
    mapResponse?: (config: any) => Promise<any> | any;
}

```

You can use the `mapResponse` function to preprocess the server response before parsing, for example:

```ts
/*
  Example server response: 
  {
    "code": 0,
    "fileName": ".env.yaml",
    "fileContent": "database:\n    table:\n        name: example"
  }
*/

TypedConfigModule.forRoot({
    schema: RootConfig,
    load: remoteLoader('http://localhost:8080', {
        type: 'yaml',
        mapResponse: response => response.fileContent
    }),
})
```


## License

[MIT](LICENSE).
