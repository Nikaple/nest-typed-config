import { INestApplication } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Validation failed', () => {
  let app: INestApplication;
  let module: TestingModuleBuilder;

  it(`should not bootstrap when validation fails`, async () => {
    expect.assertions(3);

    try {
      module = Test.createTestingModule({
        imports: [AppModule.withValidationFailed()],
      });
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
