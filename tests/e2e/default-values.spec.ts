import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ConfigWithDefaultValues } from '../src/config.model';

describe('Default values', () => {
  let app: INestApplication;

  it(`should use default values`, async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule.withConfigWithDefaultValues()],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    const config = app.get(ConfigWithDefaultValues);
    expect(config.propertyWithDefaultValue).toEqual(4321);
  });

  afterEach(async () => {
    await app?.close();
  });
});
