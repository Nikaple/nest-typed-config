import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { DirectoryConfig, DatabaseConfig } from '../src/config.model';

describe('Directory loader', () => {
  let app: INestApplication;

  it(`should be able to config from specific folder`, async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withDirectory()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    const config = app.get(DirectoryConfig);
    expect(config.table.name).toEqual('table2');

    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);
  });

  it(`should be able to include specific files`, async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withDirectoryInclude()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    const config = app.get(DirectoryConfig);
    expect(config.table.name).toEqual('table2');

    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);
  });

  it(`should be able to substitute env variables`, async () => {
    process.env['TABLE_NAME'] = 'table2';
    const module = await Test.createTestingModule({
      imports: [AppModule.withDirectorySubstitution()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    const config = app.get(DirectoryConfig);
    expect(config.table.name).toEqual('table2');

    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);
  });

  afterEach(async () => {
    process.env['TABLE_NAME'] = '';
    await app?.close();
  });
});
