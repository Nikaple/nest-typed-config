import { Injectable } from '@nestjs/common';
import { RootConfig, DatabaseConfig, TableConfig } from './config';

@Injectable()
export class AppService {
  // inject any config or sub-config you like
  constructor(
    private config: RootConfig,
    private databaseConfig: DatabaseConfig,
    private tableConfig: TableConfig,
  ) {}

  // enjoy type safety!
  public show(): any {
    const out = [
      `root.name: ${this.config.name}`,
      `root.database.name: ${this.databaseConfig.name}`,
      `root.database.table.name: ${this.tableConfig.name}`,
    ].join('\n');

    return `${out}\n`;
  }
}
