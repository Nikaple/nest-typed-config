import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class RouteConfig {
  @IsString()
  public readonly app!: string;
}

export class RootConfig {
  @IsString()
  public readonly host!: string;

  @IsNumber()
  public readonly port!: number;

  @IsDefined()
  @Type(() => RouteConfig)
  public readonly route!: RouteConfig;
}
