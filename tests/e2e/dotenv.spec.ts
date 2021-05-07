import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import { DotenvLoaderOptions } from '../../lib/loader/dotenv-loader';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

describe('Dotenv loader', () => {
  let app: INestApplication;
  let envBackup = {};

  const init = async (option?: DotenvLoaderOptions) => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withDotenv(option)],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  };

  beforeEach(() => {
    envBackup = process.env;
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
    await app.close();

    process.env = envBackup;
  });
});
