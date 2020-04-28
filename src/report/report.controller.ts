// Dependencies
import { Controller, Get, Query, ValidationPipe, UsePipes } from '@nestjs/common';

// Services
import { ReportService } from './report.service';

// Pipes
import { OrderByPipe } from './pipes/order-by.pipe';

// Dto
import { ReportDto } from './dto/report-dto';

@Controller()
export class ReportController {

  constructor(private readonly reportService: ReportService) {
  }

  @Get('reports')
  @UsePipes(ValidationPipe, OrderByPipe)
  async getReport(@Query() reportDto: ReportDto) {
    return this.reportService
      .reportByType(reportDto);
  }

  @Get('v2/reports')
  async getReportV2(@Query() queryString: any) {
    return this.reportService.buildReport(queryString);
  }
}
