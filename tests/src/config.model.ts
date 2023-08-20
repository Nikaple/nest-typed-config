import 'reflect-metadata';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TableConfig {
  @IsString()
  public readonly name!: string;
}

export class DatabaseConfig {
  @IsString()
  public readonly host!: string;

  @IsInt()
  public readonly port!: number;

  @Type(() => TableConfig)
  @ValidateNested()
  @IsDefined()
  public readonly table!: TableConfig;
}

export class DatabaseConfigAlias extends DatabaseConfig {}

export class Config {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsDefined()
  public readonly database!: DatabaseConfig;

  @IsBoolean()
  public readonly isAuthEnabled!: boolean;
}

export class ConfigWithAlias extends Config {
  @Type(() => DatabaseConfigAlias)
  @ValidateNested()
  @IsDefined()
  public readonly databaseAlias!: DatabaseConfigAlias;
}

export class DatabaseConfigWithAliasAndAuthCopy extends ConfigWithAlias {
  @Transform(({ value }) =>
    typeof value === 'boolean' ? value : value === 'true',
  )
  @IsBoolean()
  public readonly isAuthEnabledCopy!: boolean;
}

export class DirectoryConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsDefined()
  public readonly database!: DatabaseConfig;

  @Type(() => TableConfig)
  @ValidateNested()
  @IsDefined()
  public readonly table!: TableConfig;
}

export class FooConfig {
  @IsString()
  foo!: string;
}

export class BazConfig {
  @IsString()
  baz!: string;
}

export class ConfigWithDefaultValues {
  @IsInt()
  readonly propertyWithDefaultValue: number = 4321;
}
