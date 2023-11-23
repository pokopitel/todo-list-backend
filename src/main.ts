import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { swaggerSetup } from './swagger';

const PORT = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  swaggerSetup(app);

  await app.listen(PORT);
  console.log('Server is running at localhost:' + PORT);
}
bootstrap();
