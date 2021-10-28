import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('No config', () => {
  let app: INestApplication;

  it(`should not bootstrap when no config file is found`, async () => {
    expect(() => AppModule.withConfigNotFound()).toThrow(
      'Failed to find configuration file',
    );
  });

  afterEach(async () => {
    await app?.close();
  });
});
