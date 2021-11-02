import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import { DotenvLoaderOptions } from '../../lib/loader/dotenv-loader';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

jest.mock('dotenv', () => {
  if (process.env.MISSING_DOTENV) {
    throw new Error('module not found: dotenv');
  }
  return jest.requireActual('dotenv');
});
jest.mock('dotenv-expand', () => {
  if (process.env.MISSING_DOTENV_EXPAND) {
    throw new Error('module not found: dotenv-expand');
  }
  return jest.requireActual('dotenv-expand');
});
jest.mock('cosmiconfig', () => {
  throw new Error('module not found: cosmiconfig');
});

describe('Dotenv loader', () => {
  let app: INestApplication;
  const processExitStub = jest.fn();
  const consoleErrorStub = jest.fn();

  const init = async (option?: DotenvLoaderOptions) => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withDotenv(option)],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  };

  beforeEach(() => {
    process.env = {};
    process.exit = processExitStub as any;
    console.error = consoleErrorStub as any;

    jest.clearAllMocks();
  });

  it(`should throw error when dotenv is not installed`, async () => {
    process.env = {
      MISSING_DOTENV: '1',
    };
    expect(() => AppModule.withDotenvNoOption()).toThrowError();
    expect(processExitStub).toBeCalledTimes(1);
    expect(consoleErrorStub).toBeCalledTimes(1);
  });

  it(`should throw error when expandVariables is true but dotenv-expand is not installed`, async () => {
    process.env = {
      MISSING_DOTENV_EXPAND: '1',
    };
    expect(() =>
      AppModule.withDotenv({
        separator: '__',
        envFilePath: join(__dirname, '../src/.expand.env'),
        expandVariables: true,
      }),
    ).toThrowError();
    expect(processExitStub).toBeCalledTimes(1);
    expect(consoleErrorStub).toBeCalledTimes(1);
  });

  it(`should be able to load config from environment variables when option is empty`, async () => {
    process.env = {
      name: 'no-option',
    };
    const module = await Test.createTestingModule({
      imports: [AppModule.withDotenvNoOption()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = app.get(TableConfig);
    expect(config.name).toBe('no-option');
  });

  it(`should assign environment variables to process.env automatically`, async () => {
    process.env = {
      name: 'assign-process-env',
    };
    await init({
      separator: '__',
      envFilePath: join(__dirname, '../src/.env'),
    });
    expect(process.env.database__host).toBe('test');
  });

  it(`should not override environment variables which exists on process.env`, async () => {
    process.env = {
      name: 'assign-process-env',
      database__host: 'existing',
    };
    await init({
      separator: '__',
      envFilePath: join(__dirname, '../src/.env'),
    });
    expect(process.env.database__host).toBe('existing');
    expect(app.get(Config).database.host).toBe('existing');
  });

  it(`should be able to load config from environment variables`, async () => {
    process.env = {
      isAuthEnabled: 'true',
      database__host: 'test',
      database__port: '3000',
      database__table__name: 'test',
    };
    await init({ separator: '__', ignoreEnvFile: true });
    const config = app.get(Config);
    expect(config.database.host).toBe('test');
  });

  it(`should be able to load config from .env files and ignore environment variables`, async () => {
    process.env = {
      database__host: 'should-be-ignored',
    };
    await init({
      separator: '__',
      envFilePath: join(__dirname, '../src/.env'),
      ignoreEnvVars: true,
    });
    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.host).toBe('test');
  });

  it(`should be able to load config from multiple files`, async () => {
    await init({
      separator: '__',
      envFilePath: [
        join(__dirname, '../src/.part1.env'),
        join(__dirname, '../src/.part2.env'),
      ],
    });
    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.host).toBe('part1');
  });

  it(`should be able to expand variables`, async () => {
    await init({
      separator: '__',
      envFilePath: join(__dirname, '../src/.expand.env'),
      expandVariables: true,
    });

    const tableConfig = app.get(TableConfig);
    expect(tableConfig.name).toBe('expand');
  });

  afterEach(async () => {
    await app?.close();
  });
});
