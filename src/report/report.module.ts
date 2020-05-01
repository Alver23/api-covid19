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
import { GovService } from '../lib/gov/gov.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Covid', schema: CovidSchema }]),
    GovModule,
  ],
  controllers: [ReportController],
  providers: [ReportService, GovService],
})
export class ReportModule {}
