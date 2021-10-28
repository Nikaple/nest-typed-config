import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

jest.mock('@iarna/toml', () => {
  if (process.env.MISSING_TOML) {
    throw new Error('module not found: @iarna/toml');
  }
  return jest.requireActual('@iarna/toml');
});
jest.mock('dotenv', () => {
  throw new Error('module not found: dotenv');
});

describe('Local toml', () => {
  let app: INestApplication;
  let envBackup = {};
  const processExitStub = jest.fn();
  const consoleErrorStub = jest.fn();

  beforeEach(async () => {
    envBackup = process.env;
    process.exit = processExitStub as any;
    console.error = consoleErrorStub as any;

    jest.clearAllMocks();
  });

  it(`should throw error when @iarna/toml is not installed`, async () => {
    process.env = { MISSING_TOML: '1' };

    expect(() => AppModule.withToml()).toThrowError();
    expect(processExitStub).toBeCalledTimes(1);
    expect(consoleErrorStub).toBeCalledTimes(1);
  });

  it(`should be able to load toml config file`, async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withToml()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = app.get(Config);
    expect(config.isAuthEnabled).toBe(true);

    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);

    const tableConfig = app.get(TableConfig);
    expect(tableConfig.name).toBe('test');
  });

  afterEach(async () => {
    await app?.close();

    process.env = envBackup;
  });
});
