import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

describe('Local toml', () => {
  let app: INestApplication;

  const init = async (
    option: ('reject' | 'part1' | 'part2')[],
    async = true,
  ) => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withMultipleLoaders(option, async)],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  };

  it(`should merge configs from all loaders`, async () => {
    await init(['part1', 'part2']);

    const config = app.get(Config);
    expect(config.isAuthEnabled).toBe(true);

    const tableConfig = app.get(TableConfig);
    expect(tableConfig.name).toBe('test');
  });

  it(`should assure that loaders with largest index have highest priority`, async () => {
    await init(['part2', 'part1'], false);

    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.host).toBe('host.part1');
  });

  it(`should be able load config when some of the loaders fail`, async () => {
    await init(['reject', 'part1', 'part2']);
    const tableConfig = app.get(TableConfig);
    expect(tableConfig.name).toBe('test');

    await init(['reject', 'part1', 'part2'], false);
    const tableConfig2 = app.get(TableConfig);
    expect(tableConfig2.name).toBe('test');
  });

  afterEach(async () => {
    await app?.close();
  });
});
