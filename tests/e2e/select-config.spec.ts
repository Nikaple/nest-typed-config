import { selectConfig } from '../../lib';
import { AppModule } from '../src/app.module';
import { Config, DatabaseConfig, TableConfig } from '../src/config.model';

describe('Local toml', () => {
  it(`should be able to select config`, async () => {
    const module = AppModule.withRawModule();

    const config = selectConfig(module, Config);
    expect(config?.isAuthEnabled).toBe(true);

    const databaseConfig = selectConfig(module, DatabaseConfig);
    expect(databaseConfig?.port).toBe(3000);

    const tableConfig = selectConfig(module, TableConfig);
    expect(tableConfig?.name).toBe('test');
  });

  it(`can select not existing config`, async () => {
    const module = AppModule.withRawModule();

    const config1 = selectConfig(module, class {});
    expect(config1).toBeUndefined();
    const config2 = selectConfig({ module: class {} }, class {});
    expect(config2).toBeUndefined();
  });
});
