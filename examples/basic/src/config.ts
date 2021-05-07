import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';

// First, define the config model, validator is omitted for simplicity
export class TableConfig {
  @IsString()
  public readonly name!: string;
}

export class DatabaseConfig {
  @IsString()
  public readonly name!: string;

  @Type(() => TableConfig)
  @ValidateNested()
  @IsDefined()
  public readonly table!: TableConfig;
}

export class RootConfig {
  @IsString()
  public readonly name!: string;

  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsDefined()
  public readonly database!: DatabaseConfig;
}
