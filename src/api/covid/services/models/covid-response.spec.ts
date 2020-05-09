import { CCovidResponse } from './covid-response';

describe('CCovidResponse', () => {
	it('should be defined', () => {
		const mock = { name: 'Cali', total: 10 };
		const expectNameAndTotal = () => {
			return expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
					total: expect.any(Number),
				}),
			]);
		};
		expect(new CCovidResponse({ totalCases: 100, cities: [mock], state: [mock] })).toEqual(
			expect.objectContaining({
				total: expect.any(Number),
				casesByCity: expectNameAndTotal(),
				casesByState: expectNameAndTotal(),
			}),
		);
	});
});
