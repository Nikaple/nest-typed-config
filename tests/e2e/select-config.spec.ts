import { selectConfig } from '../../lib';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

describe('Local toml', () => {
  it(`should be able to select config`, async () => {
    const module = AppModule.withRawModule();

    const config = selectConfig(module, Config);
    expect(config.isAuthEnabled).toBe(true);

    const databaseConfig = selectConfig(module, DatabaseConfig);
    expect(databaseConfig.port).toBe(3000);

    const tableConfig = selectConfig(module, TableConfig);
    expect(tableConfig.name).toBe('test');
  });

  it(`can only select existing config without 'allowOptional'`, async () => {
    const module = AppModule.withRawModule();

    expect(() => selectConfig(module, class {})).toThrowError(
      'You can only select config which exists in providers',
    );
    expect(() => selectConfig({ module: class {} }, class {})).toThrowError(
      'You can only select config which exists in providers',
    );
  });

  it(`can select optional config with 'allowOptional'`, async () => {
    const module = AppModule.withRawModule();

    expect(
      selectConfig(module, class {}, { allowOptional: true }),
    ).toBeUndefined();
    expect(
      selectConfig({ module: class {} }, class {}, { allowOptional: true }),
    ).toBeUndefined();

    const config = selectConfig(module, Config, { allowOptional: true });
    expect(config?.isAuthEnabled).toBe(true);
  });
});
