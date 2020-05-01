// Dependencies
import { Controller, Get } from '@nestjs/common';

// Services
import { CovidService } from './services/covid.service';

@Controller('covid')
export class CovidController {
  constructor(
    private readonly covidService: CovidService,
  ) {}

  @Get('cases')
  public async getCases() {
    return this.covidService.getCases();
  }

  @Get('cases/recovered')
  public async getCasesRecoved() {
    return this.covidService.getCasesRecovered();
  }

  @Get('cases/deaths')
  public async getCasesDeaths() {
    return this.covidService.getCasesDeaths();
  }
}
