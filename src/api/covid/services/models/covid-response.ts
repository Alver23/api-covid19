import { CovidResponseNamespace } from './covid-response.interface';
import Item = CovidResponseNamespace.Item;
import CovidResponse = CovidResponseNamespace.CovidResponse;

export class CCovidResponse implements CovidResponse {
	total: number;
	casesByCity: Item[];
	casesByState: Item[];

	constructor(values) {
		({ totalCases: this.total, cities: this.casesByCity, state: this.casesByState } = values);
	}
}
