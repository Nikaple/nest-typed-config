import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';
import axios from 'axios';
import { RemoteLoaderConfigType, RemoteLoaderOptions } from '../../lib';

jest.mock('axios');

describe('Remote loader', () => {
  let app: INestApplication;
  const instance = {
    request: jest.fn(),
  };

  beforeEach(async () => {
    const create = jest.fn().mockReturnValue(instance);
    axios.create = create as any;
  });

  it(`should be able to load config from remote url`, async () => {
    instance.request.mockReturnValueOnce(
      Promise.resolve({
        data: {
          database: {
            port: 3000,
            host: '0.0.0.0',
            table: {
              name: 'test',
            },
          },
          isAuthEnabled: true,
        },
      }),
    );

    const module = await Test.createTestingModule({
      imports: [AppModule.withRemoteConfig()],
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

  it(`should be able to parse config format of json, yaml and toml`, async () => {
    const getTableConfig = async (option: RemoteLoaderOptions) => {
      instance.request.mockReturnValueOnce(
        Promise.resolve({
          data: {
            json: `{
              "database": {
                  "port": 3000,
                  "host": "0.0.0.0",
                  "table": {
                      "name": "json"
                  }
              },
              "isAuthEnabled": true
            }`,
            yaml: `
            isAuthEnabled: true
            database:
              host: 127.0.0.1
              port: 3000
              table:
                name: yaml
            `,
            toml: `
            isAuthEnabled = true
            [database]
            host = '127.0.0.1'
            port = 3000
  
            [database.table]
            name = 'toml'
            `,
          },
        }),
      );
      const module = await Test.createTestingModule({
        imports: [AppModule.withRemoteConfig(option)],
      }).compile();

      app = module.createNestApplication();
      await app.init();

      const config = app.get(TableConfig);
      return config;
    };

    const run = async (type: RemoteLoaderConfigType) => {
      const config = await getTableConfig({
        type,
        mapResponse: res => res[type],
      });

      expect(config.name).toBe(type);
    };

    await run('json');
    await run('yaml');
    await run('toml');
  });

  afterEach(async () => {
    await app.close();
  });
});
