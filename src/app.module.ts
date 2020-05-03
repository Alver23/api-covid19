// Dependencies
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

// Config
import config from './config/configuration';

// Interceptos
import { SentryInterceptor } from './core/interceptors/sentry/sentry-interceptor';

// Modules
import { CovidModule } from './api/covid/covid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    CovidModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
})
export class AppModule {}
