import { INestApplication } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Parsing failed', () => {
  let app: INestApplication;
  let module: TestingModuleBuilder;

  it(`should not bootstrap when parsing fails`, async () => {
    expect.assertions(2);

    try {
      module = Test.createTestingModule({
        imports: [AppModule.withErrorToml()],
      });
      await module.compile();
    } catch (err) {
      expect(err.message).toMatch(/TOML Error/);
      expect(err.message).toMatch(/\.env\.error\.toml/);
    }
  });

  it(`should not bootstrap when config is not object`, async () => {
    expect.assertions(1);

    try {
      module = Test.createTestingModule({
        imports: [AppModule.withStringConfig()],
      });
      await module.compile();
    } catch (err) {
      expect(err.message).toMatch(/Configuration should be an object/);
    }
  });

  afterEach(async () => {
    await app?.close();
  });
});
