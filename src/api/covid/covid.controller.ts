// Dependencies
import { Controller, Get, Param } from '@nestjs/common';

// Services
import { CovidService } from './services/covid.service';

@Controller('cases')
export class CovidController {
	constructor(private readonly covidService: CovidService) {}

	@Get()
	public async getCases() {
		return this.covidService.getCases();
	}

	@Get('recovered')
	public async getCasesRecoved() {
		return this.covidService.getCasesRecovered();
	}

	@Get('deaths')
	public async getCasesDeaths() {
		return this.covidService.getCasesDeaths();
	}

	@Get(':field/:value/summary')
	public async getCasesSummary(@Param() params) {
		const { field, value } = params;
		return this.covidService.getCasesSummary(field, value);
	}
}
