import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { DatabaseConfig } from '../src/config.model';

describe('Environment variables', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withNodeEnv()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`should load .env.test.toml first when NODE_ENV is test`, () => {
    const databaseConfig = app.get(DatabaseConfig);
    expect(databaseConfig.host).toBe('test');
  });

  afterEach(async () => {
    await app.close();
  });
});
