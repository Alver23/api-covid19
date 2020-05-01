export namespace CovidResponseNamespace {

  export interface Items {
    total: number;
    name: string;
  }

  export interface CovidResponse {
    total: number;
    totalToday?: number;
    casesByCity: Items[];
    casesByState: Items[];
  }
}
