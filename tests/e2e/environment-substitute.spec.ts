import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { DatabaseConfig } from '../src/config.model';

describe('Environment variable substitutions', () => {
  let app: INestApplication;

  const tableName = 'users';

  beforeEach(async () => {
    process.env['TABLE_NAME'] = tableName;
    const module = await Test.createTestingModule({
      imports: [AppModule.withYamlSubstitution()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`should load .env.yaml and substitute environment variable`, () => {
    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.table.name).toBe(tableName);
  });

  afterEach(async () => {
    process.env['TABLE_NAME'] = '';
    await app?.close();
  });
});
