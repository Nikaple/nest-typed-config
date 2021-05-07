import { INestApplication } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Environment variables', () => {
  let app: INestApplication;
  let module: TestingModuleBuilder;

  beforeEach(async () => {
    module = Test.createTestingModule({
      imports: [AppModule.withValidationFailed()],
    });
  });

  it(`should not bootstrap when validation fails`, async () => {
    expect.assertions(3);

    try {
      await module.compile();
    } catch (err) {
      expect(err.message).toMatch(/isAuthEnabled must be a boolean value/);
      expect(err.message).toMatch(/name must be a string/);
      expect(err.message).toMatch(/port must be an integer number/);
    }
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
