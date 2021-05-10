import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RootConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { host, port, route } = app.get(RootConfig);

  await app.listen(port, host);

  console.log(
    `\nApp successfully bootstrapped. You can try running:
    
    curl http://${host}:${port}${route.app}`,
  );
}

bootstrap().catch(console.error);
