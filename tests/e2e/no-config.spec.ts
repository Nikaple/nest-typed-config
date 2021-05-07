import { INestApplication } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('No config', () => {
  let app: INestApplication;
  let module: TestingModuleBuilder;

  beforeEach(async () => {
    module = Test.createTestingModule({
      imports: [AppModule.withConfigNotFound()],
    });
  });

  it(`should not bootstrap when no config file is found`, async () => {
    expect.assertions(1);

    try {
      await module.compile();
    } catch (err) {
      expect(err.message).toMatch(/Failed to find configuration file/);
    }
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
