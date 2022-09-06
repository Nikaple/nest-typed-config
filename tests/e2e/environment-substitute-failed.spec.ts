import { AppModule } from '../src/app.module';

describe('Environment variable substitutions failure', () => {
  it(`should load .env.yaml and should throw error`, async () => {
    expect(() =>
      AppModule.withYamlSubstitution({
        ignoreEnvironmentVariableSubstitution: false,
      }),
    ).toThrowError(
      `Environment variable is not set for variable name: 'TABLE_NAME'`,
    );
  });

  it(`should load .env.yaml and should not throw error when disallowUndefinedEnvironmentVariables is set to false`, async () => {
    expect(() =>
      AppModule.withYamlSubstitution({
        ignoreEnvironmentVariableSubstitution: false,
        disallowUndefinedEnvironmentVariables: false,
      }),
    ).not.toThrow();
  });
});
