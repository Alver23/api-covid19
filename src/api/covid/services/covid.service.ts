// Dependencies
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { combineLatest, Observable, Observer } from 'rxjs';
// Services
import { GovService } from '../../../lib/gov/gov.service';
// Utils
import { uriParser, genderGroup, ageRange } from './utils';
// Models
import { GovNamespace } from '../../../lib/gov.interface';
import { CCovidResponse, CovidResponseNamespace } from './models';
import Item = CovidResponseNamespace.Item;
import FIELD_TYPES = GovNamespace.FIELD_TYPES;
import ATTENTION_TYPES = GovNamespace.ATTENTION_TYPES;
import CovidResponse = CovidResponseNamespace.CovidResponse;
import CovidReponseReport = CovidResponseNamespace.CovidReponseReport;
import CovidResponseSummary = CovidResponseNamespace.CovidResponseSummary;

@Injectable()
export class CovidService {
	constructor(private readonly govService: GovService) {}

	public getTotalCases(): Observable<number> {
		const queryString = uriParser([{ name: '$select', value: 'COUNT(*) as total' }]);

		return this.govService.search(queryString).pipe(map(data => data[0].total));
	}

	public getCasesByType(type: FIELD_TYPES): Observable<Item[]> {
		const queryString = uriParser([
			{ name: '$select', value: `${type} as name,COUNT(*) as total` },
			{ name: '$group', value: type },
			{ name: '$order', value: 'total DESC' },
		]);

		return this.govService.search(queryString);
	}

	public getTotalCasesByAttention(attention: string) {
		const queryString = uriParser([
			{ name: '$select', value: 'COUNT(*) as total' },
			{ name: '$where', value: `atenci_n in(${attention})` },
		]);

		return this.govService.search(queryString).pipe(map(data => data[0].total));
	}

	public getCasesByAttention(field: FIELD_TYPES, value: string | number) {
		const queryString = uriParser([
			{ name: '$select', value: `${field} as name,COUNT(*) as total` },
			{ name: '$group', value: field },
			{ name: '$where', value: `atenci_n in('${value}')` },
			{ name: '$order', value: 'total DESC' },
		]);

		return this.govService.search(queryString);
	}

	public getCases(): Observable<CovidResponse> {
		return new Observable((observer: Observer<any>) => {
			combineLatest(
				this.getTotalCases(),
				this.getCasesByType(FIELD_TYPES.CITY),
				this.getCasesByType(FIELD_TYPES.STATE),
			).subscribe(
				([totalCases, cities, state]) => {
					observer.next({
						...new CCovidResponse({ totalCases, cities, state }),
					});
				},
				err => {
					observer.error(err);
				},
				() => observer.complete(),
			);
		});
	}

	public getCasesRecovered(): Observable<CovidResponse> {
		return new Observable((observer: Observer<any>) => {
			combineLatest(
				this.getTotalCasesByAttention(`'${ATTENTION_TYPES.RECOVERED}'`),
				this.getCasesByAttention(FIELD_TYPES.CITY, ATTENTION_TYPES.RECOVERED),
				this.getCasesByAttention(FIELD_TYPES.STATE, ATTENTION_TYPES.RECOVERED),
			).subscribe(
				([totalCases, cities, state]) => {
					observer.next({
						...new CCovidResponse({ totalCases, cities, state }),
					});
				},
				err => {
					observer.error(err);
				},
				() => observer.complete(),
			);
		});
	}

	public getCasesDeaths(): Observable<CovidResponse> {
		return new Observable((observer: Observer<any>) => {
			combineLatest(
				this.getTotalCasesByAttention(`'${ATTENTION_TYPES.DEATHS}'`),
				this.getCasesByAttention(FIELD_TYPES.CITY, ATTENTION_TYPES.DEATHS),
				this.getCasesByAttention(FIELD_TYPES.STATE, ATTENTION_TYPES.DEATHS),
			).subscribe(
				([totalCases, cities, state]) => {
					observer.next({
						...new CCovidResponse({ totalCases, cities, state }),
					});
				},
				err => {
					observer.error(err);
				},
				() => observer.complete(),
			);
		});
	}

	public getCasesByTypeAndField(
		type: FIELD_TYPES,
		field: FIELD_TYPES,
		value: string,
		additionalWhere?: string,
	): Observable<Item[]> {
		const queryString = uriParser([
			{ name: '$select', value: `${type} as name, COUNT(*) as total` },
			{ name: '$group', value: type },
			{ name: '$where', value: `${field} like '${value}' ${additionalWhere ? additionalWhere : ''}` },
			{ name: '$order', value: 'total DESC' },
		]);
		return this.govService.search(queryString);
	}

	public getCasesByGender({ field, value, attentionRecovered, attentionDeath }): Observable<CovidReponseReport> {
		return new Observable<CovidReponseReport>((observer: Observer<CovidReponseReport>) => {
			combineLatest(
				this.getCasesByTypeAndField(FIELD_TYPES.GENDER, FIELD_TYPES[field], value).pipe(
					map(items => genderGroup(items)),
				),
				this.getCasesByTypeAndField(FIELD_TYPES.GENDER, FIELD_TYPES[field], value, attentionRecovered).pipe(
					map(items => genderGroup(items)),
				),
				this.getCasesByTypeAndField(FIELD_TYPES.GENDER, FIELD_TYPES[field], value, attentionDeath).pipe(
					map(items => genderGroup(items)),
				),
			).subscribe(
				([items, recoveredItems, deathsItems]) => {
					observer.next({ items, recoveredItems, deathsItems });
				},
				err => observer.error(err),
				() => observer.complete(),
			);
		});
	}

	public getCasesByAge({ field, value, attentionRecovered, attentionDeath }): Observable<CovidReponseReport> {
		return new Observable<CovidReponseReport>((observer: Observer<CovidReponseReport>) => {
			combineLatest(
				this.getCasesByTypeAndField(FIELD_TYPES.AGE, FIELD_TYPES[field], value).pipe(map(items => ageRange(items))),
				this.getCasesByTypeAndField(FIELD_TYPES.AGE, FIELD_TYPES[field], value, attentionRecovered).pipe(
					map(items => ageRange(items)),
				),
				this.getCasesByTypeAndField(FIELD_TYPES.AGE, FIELD_TYPES[field], value, attentionDeath).pipe(
					map(items => ageRange(items)),
				),
			).subscribe(
				([items, recoveredItems, deathsItems]) => {
					observer.next({ items, recoveredItems, deathsItems });
				},
				err => observer.error(err),
				() => observer.complete(),
			);
		});
	}

	public getCasesSummary(field: string, value: string): Observable<CovidResponseSummary> {
		const fieldValue = field.toUpperCase();
		const attentionRecovered = `and atenci_n in('${ATTENTION_TYPES.RECOVERED}')`;
		const attentionDeath = `and atenci_n in('${ATTENTION_TYPES.DEATHS}')`;
		return new Observable<CovidResponseSummary>((observer: Observer<CovidResponseSummary>) => {
			combineLatest(
				this.getCasesByGender({ field: fieldValue, value, attentionRecovered, attentionDeath }),
				this.getCasesByAge({ field: fieldValue, value, attentionRecovered, attentionDeath }),
			).subscribe(
				([casesByGender, casesByAge]) => {
					observer.next({ casesByGender, casesByAge });
				},
				err => observer.error(err),
				() => observer.complete(),
			);
		});
	}
}
