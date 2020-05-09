// Dependencies
import { of, throwError } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';
// Services
import { CovidService } from './covid.service';
// Modules
import { GovService } from '../../../lib/gov/gov.service';
// Mocks
import mocks from './mocks.json';
import { GovServiceMock } from '../../../lib/gov/gov-service-mock';
// Models
import { GovNamespace } from '../../../lib/gov.interface';
import FIELD_TYPES = GovNamespace.FIELD_TYPES;

describe('CovidService', () => {
	let service: CovidService;
	let govService: GovService;

	const spyFunction = data => {
		const spy = jest.spyOn(govService, 'search').mockReturnValue(of(data));
		return spy;
	};

	const expectNameAndTotal = () => ({
		name: expect.any(String),
		total: expect.any(Number),
	});

	const { totalCases, cases, casesSummary } = mocks;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			providers: [CovidService, { provide: GovService, useClass: GovServiceMock }],
		}).compile();

		service = moduleRef.get<CovidService>(CovidService);
		govService = moduleRef.get<GovService>(GovService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getTotalCases method', () => {
		it('should get the total cases of the covid 19', done => {
			const spy = spyFunction(totalCases);
			service.getTotalCases().subscribe(response => {
				expect(spy).toBeCalledTimes(1);
				expect(response).toEqual(expect.any(Number));
				done();
			});
		});
	});

	describe('getCasesByType method', () => {
		it('should get the cases by type', done => {
			const spy = spyFunction(cases);
			service.getCasesByType(FIELD_TYPES.CITY).subscribe(response => {
				expect(spy).toBeCalledTimes(1);
				expect(response).toEqual(expect.arrayContaining([expect.objectContaining(expectNameAndTotal())]));
				done();
			});
		});
	});

	describe('getTotalCasesByAttention method', () => {
		it('should get the total cases by type of attention', done => {
			const spy = spyFunction(totalCases);
			service.getTotalCasesByAttention('').subscribe(response => {
				expect(spy).toBeCalledTimes(1);
				expect(response).toEqual(expect.any(Number));
				done();
			});
		});
	});

	describe('getCasesByAttention method', () => {
		it('should get the cases by type of attention', done => {
			const spy = spyFunction(cases);
			service.getCasesByAttention(FIELD_TYPES.CITY, '').subscribe(response => {
				expect(spy).toBeCalledTimes(1);
				expect(response).toEqual(expect.arrayContaining([expect.objectContaining(expectNameAndTotal())]));
				done();
			});
		});
	});

	describe('getCases method', () => {
		it('should get the cases for cities and state', done => {
			jest.spyOn(service, 'getTotalCases').mockReturnValue(of(totalCases[0].total));
			jest.spyOn(service, 'getCasesByType').mockReturnValue(of(cases));
			service.getCases().subscribe(response => {
				expect(response).toEqual(
					expect.objectContaining({
						total: expect.any(Number),
						casesByCity: expect.arrayContaining([
							expect.objectContaining({
								...expectNameAndTotal(),
							}),
						]),
						casesByState: expect.arrayContaining([
							expect.objectContaining({
								...expectNameAndTotal(),
							}),
						]),
					}),
				);
				done();
			});
		});

		it('should get an error', done => {
			const errors: Error = new Error('opps');
			jest.spyOn(service, 'getTotalCases').mockReturnValue(throwError(errors));
			jest.spyOn(service, 'getCasesByType').mockReturnValue(throwError(errors));
			service.getCases().subscribe(
				() => {},
				error => {
					expect(error).toEqual(errors);
					done();
				},
			);
		});
	});

	describe('getCasesRecovered method', () => {
		it('should get the cases recovered', done => {
			jest.spyOn(service, 'getTotalCasesByAttention').mockReturnValue(of(totalCases[0].total));
			jest.spyOn(service, 'getCasesByAttention').mockReturnValue(of(cases));
			service.getCasesRecovered().subscribe(response => {
				expect(response).toEqual(
					expect.objectContaining({
						total: expect.any(Number),
						casesByCity: expect.arrayContaining([
							expect.objectContaining({
								...expectNameAndTotal(),
							}),
						]),
						casesByState: expect.arrayContaining([
							expect.objectContaining({
								...expectNameAndTotal(),
							}),
						]),
					}),
				);
				done();
			});
		});

		it('should get an error', done => {
			const errors: Error = new Error('opps');
			jest.spyOn(service, 'getTotalCasesByAttention').mockReturnValue(throwError(errors));
			jest.spyOn(service, 'getCasesByAttention').mockReturnValue(throwError(errors));
			service.getCasesRecovered().subscribe(
				() => {},
				error => {
					expect(error).toEqual(errors);
					done();
				},
			);
		});
	});

	describe('getCasesDeaths method', () => {
		it('should get the cases deaths', done => {
			jest.spyOn(service, 'getTotalCasesByAttention').mockReturnValue(of(totalCases[0].total));
			jest.spyOn(service, 'getCasesByAttention').mockReturnValue(of(cases));
			service.getCasesDeaths().subscribe(response => {
				expect(response).toEqual(
					expect.objectContaining({
						total: expect.any(Number),
						casesByCity: expect.arrayContaining([
							expect.objectContaining({
								...expectNameAndTotal(),
							}),
						]),
						casesByState: expect.arrayContaining([
							expect.objectContaining({
								...expectNameAndTotal(),
							}),
						]),
					}),
				);
				done();
			});
		});

		it('should get an error', done => {
			const errors: Error = new Error('opps');
			jest.spyOn(service, 'getTotalCasesByAttention').mockReturnValue(throwError(errors));
			jest.spyOn(service, 'getCasesByAttention').mockReturnValue(throwError(errors));
			service.getCasesDeaths().subscribe(
				() => {},
				error => {
					expect(error).toEqual(errors);
					done();
				},
			);
		});
	});

	describe('getCasesByTypeAndField method', () => {
		it('should get the cases by type and field', done => {
			const spy = spyFunction(cases);
			service.getCasesByTypeAndField(FIELD_TYPES.AGE, FIELD_TYPES.CITY, 'cali').subscribe(response => {
				expect(spy).toBeCalledTimes(1);
				expect(response).toEqual(expect.arrayContaining([expect.objectContaining(expectNameAndTotal())]));
				done();
			});
		});
	});

	describe('getCasesByGender method', () => {
		it('should get the cases by gender', done => {
			jest.spyOn(service, 'getCasesByTypeAndField').mockReturnValue(of([{ name: '10', total: 10 }]));
			service.getCasesByGender({ field: FIELD_TYPES.CITY, value: 'cali' } as any).subscribe(response => {
				expect(response).toEqual(
					expect.objectContaining({
						items: expect.any(Array),
						recoveredItems: expect.any(Array),
						deathsItems: expect.any(Array),
					}),
				);
				done();
			});
		});
	});

	describe('getCasesByAge method', () => {
		it('should get the cases by age', done => {
			jest.spyOn(service, 'getCasesByTypeAndField').mockReturnValue(of([{ name: 'Masculino', total: 10 }]));
			service.getCasesByAge({ field: FIELD_TYPES.CITY, value: 'cali' } as any).subscribe(response => {
				expect(response).toEqual(
					expect.objectContaining({
						items: expect.any(Array),
						recoveredItems: expect.any(Array),
						deathsItems: expect.any(Array),
					}),
				);
				done();
			});
		});
	});

	describe('getCasesSummary method', () => {
		it('should get the cases', done => {
			jest
				.spyOn(service, 'getCasesByTypeAndField')
				.mockImplementationOnce(() => of([{ name: 'Masculino', total: 10 }]));
			const genderSpy = jest.spyOn(service, 'getCasesByGender').mockImplementationOnce(() => of(casesSummary));
			const ageSpy = jest.spyOn(service, 'getCasesByAge').mockImplementationOnce(() => of(casesSummary));
			service.getCasesSummary('city', 'Cali').subscribe(response => {
				expect(response).toEqual(
					expect.objectContaining({
						casesByGender: expect.objectContaining({
							items: expect.any(Array),
							recoveredItems: expect.any(Array),
							deathsItems: expect.any(Array),
						}),
						casesByAge: expect.objectContaining({
							items: expect.any(Array),
							recoveredItems: expect.any(Array),
							deathsItems: expect.any(Array),
						}),
					}),
				);
				expect(genderSpy).toBeCalledTimes(1);
				expect(ageSpy).toBeCalledTimes(1);
				done();
			});
		});

		it('should get an error', done => {
			const errors: Error = new Error('opps');
			jest.spyOn(service, 'getCasesByGender').mockReturnValue(throwError(errors));
			jest.spyOn(service, 'getCasesByAge').mockReturnValue(throwError(errors));
			service.getCasesSummary('city', 'Cali').subscribe(
				() => {},
				error => {
					expect(error).toEqual(errors);
					done();
				},
			);
		});
	});
});
