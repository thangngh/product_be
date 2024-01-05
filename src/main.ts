import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config"
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
