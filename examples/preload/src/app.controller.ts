import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { rootConfig } from './config.module';

@Controller(rootConfig.route.app)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  show(): void {
    return this.appService.show();
  }
}
