import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

describe('Local toml', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withSpecialFormat()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`should be able to load special format through loaders`, () => {
    const config = app.get(Config);
    expect(config.isAuthEnabled).toBe(true);

    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);

    const tableConfig = app.get(TableConfig);
    expect(tableConfig.name).toBe('test');
  });

  afterEach(async () => {
    await app?.close();
  });
});
