import { Module } from '@nestjs/common';
import { TypedConfigModule, fileLoader } from 'nest-typed-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootConfig } from './config';

// Register TypedConfigModule
@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: fileLoader(),
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
