import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config.module';

@Module({
  imports: [ConfigModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
