import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { DirectoryConfig, DatabaseConfig } from '../src/config.model';

describe('Directory loader', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withDirectory()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`should be able to config from specific folder`, () => {
    const config = app.get(DirectoryConfig);
    expect(config.table.name).toEqual('table2');

    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);
  });

  afterEach(async () => {
    await app?.close();
  });
});
