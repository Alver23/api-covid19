// Dependencies
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { ReportController } from './report.controller';

// Services
import { ReportService } from './report.service';

// Schemas
import { CovidSchema } from '../schemas/covid';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Covid', schema: CovidSchema }])
  ],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
