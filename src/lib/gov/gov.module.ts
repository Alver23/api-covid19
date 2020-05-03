// Dependencies
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, HttpModule } from '@nestjs/common';

// Services
import { GovService } from './gov.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 5,
    }),
  ],
  providers: [GovService],
  exports: [HttpModule],
})
export class GovModule {}
