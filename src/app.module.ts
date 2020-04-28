// Dependencies
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';

// Config
import config from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://api_covid:U1sRtsR8GXKcjgyL@cluster0-qcpaq.mongodb.net/api_covid?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
