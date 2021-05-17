import { INestApplication } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('No config', () => {
  let app: INestApplication;
  let module: TestingModuleBuilder;

  it(`should not bootstrap when no config file is found`, async () => {
    expect.assertions(1);

    try {
      module = Test.createTestingModule({
        imports: [AppModule.withConfigNotFound()],
      });
      await module.compile();
    } catch (err) {
      expect(err.message).toMatch(/Failed to find configuration file/);
    }
  });

  afterEach(async () => {
    await app?.close();
  });
});
