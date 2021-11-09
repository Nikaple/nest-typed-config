import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { BazConfig, FooConfig } from '../src/config.model';

describe('Multiple config schemas', () => {
  let app: INestApplication;

  it(`should merge configs from all loaders`, async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withMultipleSchemas()],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const fooConfig = app.get(FooConfig);
    const bazConfig = app.get(BazConfig);

    expect(fooConfig.foo).toBe('bar');
    expect(bazConfig.baz).toBe('qux');

    await app.close();
  });
});
