import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Validation failed', () => {
  let app: INestApplication;

  it(`should not bootstrap when validation fails`, async () => {
    expect(() => AppModule.withValidationFailed()).toThrowError(
      'isAuthEnabled must be a boolean value',
    );
    expect(() => AppModule.withValidationFailed()).toThrowError(
      'name must be a string',
    );
    expect(() => AppModule.withValidationFailed()).toThrowError(
      'port must be an integer number',
    );
  });

  afterEach(async () => {
    await app?.close();
  });
});
