// Dependencies
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, HttpModule } from '@nestjs/common';

// Services
import { CovidService } from './covid.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [CovidService],
  exports:[HttpModule]
})
export class GovModule {}
