// Dependencies
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as Sentry from '@sentry/node';
import configuration from './config/configuration';
import { SentryInterceptor } from './core/interceptors/sentry/sentry-interceptor';

async function bootstrap() {
  const api = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  api.use(helmet());
  api.enableCors();
  api.useGlobalInterceptors(new SentryInterceptor());
  api.setGlobalPrefix('api');
  Sentry.init({
    dsn: configuration().SENTRY_DNS,
  });
  await api.listen(3000);
  console.log(`Application is running on: ${await api.getUrl()}`);
}
bootstrap();
