import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const server = await app.listen(0);
  const port = server.address().port;

  console.log(
    `\nApp successfully bootstrapped. You can try running:
    
    curl http://127.0.0.1:${port}`,
  );
}

bootstrap().catch(console.error);
