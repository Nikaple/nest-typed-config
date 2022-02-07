import { AppModule } from '../src/app.module';

describe('Environment variable substitutions failure', () => {
  it(`should load .env.yaml and should not throw error`, async () => {
    expect(() => AppModule.withYamlSubstitution()).toThrowError(
      `Environment variable is not set for variable name: 'TABLE_NAME'`,
    );
  });
});
