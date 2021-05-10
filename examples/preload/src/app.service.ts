import { Injectable } from '@nestjs/common';
import { RootConfig } from './config';

@Injectable()
export class AppService {
  // inject any config or sub-config you like
  constructor(private config: RootConfig) {}

  // enjoy type safety!
  public show(): any {
    return `Your configuration is: \n${JSON.stringify(this.config, null, 4)}\n`;
  }
}
