// Dependencies
// import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const api = await NestFactory.create(AppModule, {  logger: ['error', 'warn'], });
  api.use(helmet());
  api.enableCors();
  api.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  api.setGlobalPrefix('api');
  // api.use(csurf());
  await api.listen(3000);
  console.log(`Application is running on: ${await api.getUrl()}`);
}
bootstrap();
