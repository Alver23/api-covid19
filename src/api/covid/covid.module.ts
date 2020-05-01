// Dependencies
import { Module } from '@nestjs/common';

// Controllers
import { CovidController } from './covid.controller';

// Services
import { CovidService } from './services/covid.service';

import { GovModule } from './../../lib/gov/gov.module';
import { GovService } from './../../lib/gov/gov.service';

@Module({
  imports: [GovModule],
  controllers: [CovidController],
  providers: [CovidService, GovService]
})
export class CovidModule {}
