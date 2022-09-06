import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FileLoaderOptions } from '../../lib';
import { AppModule } from '../src/app.module';
import { DatabaseConfig } from '../src/config.model';

describe('Environment variable substitutions', () => {
  let app: INestApplication;

  const tableName = 'users';

  const init = async (options: FileLoaderOptions) => {
    process.env['TABLE_NAME'] = tableName;
    const module = await Test.createTestingModule({
      imports: [AppModule.withYamlSubstitution(options)],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  };

  it(`should load .env.yaml and substitute environment variable`, async () => {
    await init({ ignoreEnvironmentVariableSubstitution: false });
    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.table.name).toBe(tableName);
  });

  it(`should load .env.yaml and substitute environment variable`, async () => {
    await init({ ignoreEnvironmentVariableSubstitution: true });
    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.table.name).toBe('${TABLE_NAME}');
  });

  afterEach(async () => {
    process.env['TABLE_NAME'] = '';
    await app?.close();
  });
});
