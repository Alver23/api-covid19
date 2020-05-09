export namespace CovidResponseNamespace {
	export interface Item {
		total: number | string;
		name: string;
	}

	export interface CovidResponse {
		total: number;
		totalToday?: number;
		casesByCity: Item[];
		casesByState: Item[];
	}

	export interface CovidReponseReport {
		recoveredItems: Item[];
		deathsItems: Item[];
		items: Item[];
	}

	export interface CovidResponseSummary {
		casesByAge: CovidReponseReport;
		casesByGender: CovidReponseReport;
	}
}
