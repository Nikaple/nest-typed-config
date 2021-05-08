import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { TableConfig } from '../src/config.model';
import { RemoteLoaderConfigType, RemoteLoaderOptions } from '../../lib';
import axios from 'axios';

jest.mock('axios');

describe('Remote loader', () => {
  let app: INestApplication;
  const instance = {
    request: jest.fn(),
  };

  beforeEach(async () => {
    const create = jest.fn().mockReturnValue(instance);
    axios.create = create as any;
    (axios.CancelToken as any).source = jest.fn().mockReturnValue({
      cancel: jest.fn(),
    });
    instance.request.mockClear();
  });

  it(`should be able to parse config format of json, yaml and toml`, async () => {
    instance.request.mockResolvedValue({
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
        yml: `
          isAuthEnabled: true
          database:
            host: 127.0.0.1
            port: 3000
            table:
              name: yml
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
    });
    const getTableConfig = async (option: RemoteLoaderOptions) => {
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
        type: type === 'yml' ? type : () => type,
        mapResponse: res => res[type],
        retries: 1,
        retryInterval: 100,
      });

      expect(config.name).toBe(type);
    };

    await run('json');
    await run('yaml');
    await run('yml');
    await run('toml');
  });

  it(`should be able to load config from remote url`, async () => {
    instance.request.mockResolvedValue({
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
    });

    const module = await Test.createTestingModule({
      imports: [AppModule.withRemoteConfig()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const tableConfig = app.get(TableConfig);
    expect(tableConfig.name).toBe('test');
  });

  it(`should be able to specify retryInterval and retries`, async () => {
    expect.assertions(2);

    const getTableConfig = async (option: RemoteLoaderOptions) => {
      instance.request.mockRejectedValueOnce(new Error(`Rejected #1`));
      instance.request.mockResolvedValueOnce({ data: { code: 400 } });
      instance.request.mockResolvedValueOnce({
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
      });
      const module = await Test.createTestingModule({
        imports: [
          AppModule.withRemoteConfig({
            retryInterval: 100,
            shouldRetry: res => res.data.code === 400,
            ...option,
          }),
        ],
      }).compile();

      app = module.createNestApplication();
      await app.init();

      return app.get(TableConfig);
    };

    const tableConfig = await getTableConfig({ retries: 2 });
    expect(tableConfig.name).toBe('test');

    try {
      await getTableConfig({ retries: 1 });
    } catch (err) {
      expect(err.message).toMatch(/the number of retries has been exhausted/);
    }
  });

  afterEach(async () => {
    await app?.close();
  });
});
