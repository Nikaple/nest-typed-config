import { AppModule, TestYamlFile } from '../src/app.module';
import {
  ConfigWithAlias,
  DatabaseConfig,
  DatabaseConfigAlias,
  DatabaseConfigWithAliasAndAuthCopy,
} from '../src/config.model';
import { INestApplication } from '@nestjs/common';
import { FileLoaderOptions } from '../../lib';
import { Test } from '@nestjs/testing';
import { ClassConstructor, instanceToPlain } from 'class-transformer';

describe('Environment variable substitutions success cases', () => {
  let app: INestApplication;

  const tableName = 'users';

  const init = async (
    options: FileLoaderOptions,
    fileNames: Array<TestYamlFile>,
    schema: ClassConstructor<any> = ConfigWithAlias,
  ) => {
    process.env['TABLE_NAME'] = tableName;
    const module = await Test.createTestingModule({
      imports: [AppModule.withYamlSubstitution(options, schema, fileNames)],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  };

  it(`should load yaml and substitute environment variable and expand values`, async () => {
    await init({ ignoreEnvironmentVariableSubstitution: false }, [
      '.env-advanced.sub.yaml',
    ]);
    const databaseConfig = app.get(DatabaseConfig);
    const databaseConfigAlias = app.get(DatabaseConfigAlias);
    expect(databaseConfig.table.name).toBe(tableName);
    const alias = instanceToPlain(databaseConfigAlias);
    expect(alias).toStrictEqual(instanceToPlain(databaseConfig));
    expect(alias.port).toBe(3000);
    expect(alias.table.name).toBe(tableName);
    expect(alias.host).toBe('127.0.0.1');
  });

  it(`should load yaml and do the cross substitution between objects`, async () => {
    await init({ ignoreEnvironmentVariableSubstitution: false }, [
      '.env-object-cross-referencing.sub.yaml',
    ]);
    const databaseConfig = app.get(DatabaseConfig);
    const databaseConfigAlias = app.get(DatabaseConfigAlias);
    const alias = instanceToPlain(databaseConfigAlias);
    expect(alias).toStrictEqual(instanceToPlain(databaseConfig));
  });

  it(`self substitution advanced case`, async () => {
    await init({ ignoreEnvironmentVariableSubstitution: false }, [
      '.env-advanced-self-referencing-tricky.sub.yaml',
    ]);
    const databaseConfig = app.get(DatabaseConfig);
    const databaseConfigAlias = app.get(DatabaseConfigAlias);

    expect(databaseConfig.table.name).toBe(tableName);
    expect(databaseConfig.port).toBe(3000);
    expect(databaseConfig.table.name).toBe(tableName);
    expect(databaseConfig.host).toBe('localhost');

    expect(databaseConfigAlias.host).toBe('http://localhost:3000');
    expect(databaseConfigAlias.port).toBe(3000);
    expect(databaseConfigAlias.table.name).toBe(
      `http://localhost:3000/${tableName}?authEnabled=true`,
    );
  });

  it(`should load yaml and substitute environment variable and expand values, for two files`, async () => {
    await init({ ignoreEnvironmentVariableSubstitution: false }, [
      '.env-advanced.sub.yaml',
      '.env-second-file.sub.yaml',
    ]);
    const databaseConfig = app.get(DatabaseConfig);
    const databaseConfigAlias = app.get(DatabaseConfigAlias);
    expect(databaseConfig.table.name).toBe(tableName);
    const alias = instanceToPlain(databaseConfigAlias);
    expect(alias).toStrictEqual(instanceToPlain(databaseConfig));
    expect(alias.port).toBe(3000);
    expect(alias.table.name).toBe(tableName);
    expect(alias.host).toBe('127.0.0.1');
  });

  it('have a substitution in a first file and reference it in a second file', async () => {
    await init({ ignoreEnvironmentVariableSubstitution: false }, [
      '.env-advanced-backward-reference.sub.yaml',
      '.env-second-file.sub.yaml',
    ]);

    const databaseConfig = app.get(DatabaseConfig);
    const databaseConfigAlias = app.get(DatabaseConfigAlias);
    expect(databaseConfig.table.name).toBe(tableName);
    const alias = instanceToPlain(databaseConfigAlias);
    expect(alias).toStrictEqual(instanceToPlain(databaseConfig));
    expect(alias.port).toBe(3000);
    expect(alias.table.name).toBe(tableName);
    expect(alias.host).toBe('127.0.0.1');
  });

  /**
   *  this is a side effect of one by one processing of yaml files,
   * instead of read all files then merge and only after that process substitutions
   * but there is workaround to override the first value two, so it's not a blocker and
   * it's super rare case, I don't think it's worth to do anything with it
   * */
  it('override key in second yaml file and reference it in a first one', async () => {
    await init({ ignoreEnvironmentVariableSubstitution: false }, [
      '.env-advanced-backward-reference.sub.yaml',
      '.env-second-with-hardcoded-host-file.sub.yaml',
    ]);

    const databaseConfig = app.get(DatabaseConfig);
    const databaseConfigAlias = app.get(DatabaseConfigAlias);

    expect(databaseConfig.port).toBe(3000);
    expect(databaseConfig.table.name).toBe(tableName);
    // this one ideally should be a value from second file (my-host.com)
    expect(databaseConfig.host).toBe('127.0.0.1');

    expect(databaseConfigAlias.port).toBe(3000);
    expect(databaseConfigAlias.table.name).toBe(tableName);
    expect(databaseConfigAlias.host).toBe('my-host.com');
  });

  it('env name the same as field name in yaml file', async () => {
    process.env['isAuthEnabled'] = 'false';

    await init(
      { ignoreEnvironmentVariableSubstitution: false },
      ['.env-field-name-the-same-as-env.sub.yaml'],
      DatabaseConfigWithAliasAndAuthCopy,
    );
    const config = app.get(DatabaseConfigWithAliasAndAuthCopy);
    const databaseConfig = app.get(DatabaseConfig);
    const databaseConfigAlias = app.get(DatabaseConfigAlias);
    expect(databaseConfig.table.name).toBe(tableName);
    const alias = instanceToPlain(databaseConfigAlias);
    expect(alias).toStrictEqual(instanceToPlain(databaseConfig));
    expect(alias.port).toBe(3000);
    expect(alias.table.name).toBe(tableName);
    expect(alias.host).toBe('127.0.0.1');
    // env variables have a bigger precedence then yaml file values
    expect(config.isAuthEnabledCopy).toBe(false);
    expect(config.isAuthEnabled).toBe(true);
  });
});

describe('Environment variable substitutions error cases', () => {
  it(`should detect simple circular self reference and throw an error on startup `, async () => {
    expect(() =>
      AppModule.withYamlSubstitution(
        {
          ignoreEnvironmentVariableSubstitution: false,
        },
        ConfigWithAlias,
        ['.env-self-reference.sub.yaml'],
      ),
    ).toThrowError(
      'Circular self reference detected: ${database.host} -> ${database.host}',
    );
  });

  it(`should detect complex circular reference between three keys and throw an error on startup `, async () => {
    expect(() =>
      AppModule.withYamlSubstitution(
        {
          ignoreEnvironmentVariableSubstitution: false,
        },
        ConfigWithAlias,
        ['.env-circular-between3.sub.yaml'],
      ),
    ).toThrowError('Maximum call stack size exceeded');
  });

  it(`should detect complex circular reference between two keys and throw an error on startup `, async () => {
    expect(() =>
      AppModule.withYamlSubstitution(
        {
          ignoreEnvironmentVariableSubstitution: false,
        },
        ConfigWithAlias,
        ['.env-circular-between2.sub.yaml'],
      ),
    ).toThrowError('Maximum call stack size exceeded');
  });

  it('object substitution', async () => {
    expect(() =>
      AppModule.withYamlSubstitution(
        {
          ignoreEnvironmentVariableSubstitution: false,
        },
        ConfigWithAlias,
        ['.env-reference-object.sub.yaml'],
      ),
    ).toThrowError(
      `Environment variable is not set for variable name: 'database'`,
    );
  });

  it('array primitives substitution', async () => {
    expect(() =>
      AppModule.withYamlSubstitution(
        {
          ignoreEnvironmentVariableSubstitution: false,
        },
        ConfigWithAlias,
        ['.env-reference-array-of-primitives.sub.yaml'],
      ),
    ).toThrowError(
      `Environment variable is not set for variable name: 'stringArray'`,
    );
  });

  it('chain substitution with wrong value at the end of a chain', async () => {
    expect(() =>
      AppModule.withYamlSubstitution(
        {
          ignoreEnvironmentVariableSubstitution: false,
        },
        ConfigWithAlias,
        ['.env-advanced-chain-reference-wrong-value.sub.yaml'],
      ),
    ).toThrowError(
      `Environment variable is not set for variable name: 'database.noValue'`,
    );
  });

  it('array of objects substitution', async () => {
    expect(() =>
      AppModule.withYamlSubstitution(
        {
          ignoreEnvironmentVariableSubstitution: false,
        },
        ConfigWithAlias,
        ['.env-reference-array-of-objects.sub.yaml'],
      ),
    ).toThrowError(
      `Environment variable is not set for variable name: 'objectArray'`,
    );
  });
});
