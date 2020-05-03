import { CovidResponseNamespace } from './covid-response.interface';
import Items = CovidResponseNamespace.Items;
import CovidResponse = CovidResponseNamespace.CovidResponse;

export class CCovidResponse implements CovidResponse {
  total: number;
  casesByCity: Items[];
  casesByState: Items[];

  constructor(values) {
    ({
      totalCases: this.total,
      cities: this.casesByCity,
      state: this.casesByState,
    } = values);
  }
}
