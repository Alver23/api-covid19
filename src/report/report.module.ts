// Dependencies
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { ReportController } from './report.controller';

// Services
import { ReportService } from './report.service';

// Schemas
import { CovidSchema } from '../schemas/covid';

import { GovModule } from '../lib/gov/gov.module';
import { CovidService } from '../lib/gov/covid.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Covid', schema: CovidSchema }]),
    GovModule,
  ],
  controllers: [ReportController],
  providers: [ReportService, CovidService],
})
export class ReportModule {}
