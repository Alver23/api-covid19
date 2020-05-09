// Dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Controller
import { CovidController } from './covid.controller';

// Services
import { CovidService } from './services/covid.service';

// Mocks
import mocks from './mocks.json';
import { CovidServiceMock } from './services/covid-service-mock';

describe('Covid Controller', () => {
	let controller: CovidController;
	let service: CovidService;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [CovidController],
			providers: [{ provide: CovidService, useClass: CovidServiceMock }],
		}).compile();

		controller = moduleRef.get<CovidController>(CovidController);
		service = moduleRef.get<CovidService>(CovidService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('cases', () => {
		it('should get the cases', () => {
			const spy = jest.spyOn(service, 'getCases').mockReturnValue(mocks as any);
			return controller.getCases().then(() => {
				expect(spy).toBeCalledTimes(1);
			});
		});
	});

	describe('recovered', () => {
		it('should get the cases', () => {
			const spy = jest.spyOn(service, 'getCasesRecovered').mockReturnValue(mocks as any);
			return controller.getCasesRecoved().then(() => {
				expect(spy).toBeCalledTimes(1);
			});
		});
	});

	describe('deaths', () => {
		it('should get the cases', () => {
			const spy = jest.spyOn(service, 'getCasesDeaths').mockReturnValue(mocks as any);
			return controller.getCasesDeaths().then(() => {
				expect(spy).toBeCalledTimes(1);
			});
		});
	});

	describe('getCasesSummary', () => {
		it('should get the cases', () => {
			const spy = jest.spyOn(service, 'getCasesSummary');
			return controller.getCasesSummary({ field: 'fake', value: 'cali' }).then(() => {
				expect(spy).toBeCalledTimes(1);
			});
		});
	});
});
