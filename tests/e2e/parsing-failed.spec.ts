import { INestApplication } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Parsing failed', () => {
  let app: INestApplication;
  let module: TestingModuleBuilder;

  it(`should not bootstrap when parsing fails`, async () => {
    expect(() => AppModule.withErrorToml()).toThrow('TOML Error');
    expect(() => AppModule.withErrorToml()).toThrow('.env.error.toml');
  });

  it(`should not bootstrap when config is not object`, async () => {
    module = Test.createTestingModule({
      imports: [AppModule.withStringConfig()],
    });
    await expect(module.compile()).rejects.toThrow(
      'Configuration should be an object',
    );
  });

  afterEach(async () => {
    await app?.close();
  });
});
