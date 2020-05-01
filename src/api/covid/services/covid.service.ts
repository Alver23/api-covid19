// Dependencies
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { combineLatest, Observable, Observer } from 'rxjs';

// Services
import { GovService } from '../../../lib/gov/gov.service';

// Utils
import { uriParser } from './utils';


// Models
import { GovNamespace } from '../../../lib/gov.interface';
import { CovidResponseNamespace } from './models';

import Items = CovidResponseNamespace.Items;
import FIELD_TYPES = GovNamespace.FIELD_TYPES;
import ATTENTION_TYPES = GovNamespace.ATTENTION_TYPES;
import CovidResponse = CovidResponseNamespace.CovidResponse;

@Injectable()
export class CovidService {
  constructor(
    private readonly govService: GovService,
  ) {}

  public getTotalCases(): Observable<{ total: number }> {
    const queryString = uriParser(
      [{ name : '$select', value: 'COUNT(*) as total' }],
    );

    return this.govService
      .search(queryString)
      .pipe(
        map(data => data[0]),
      );
  }

  public getCasesByType(type: FIELD_TYPES): Observable<Items[]> {
    const queryString = uriParser(
      [
        { name: '$select', value: `${type} as name,COUNT(*) as total` },
        { name: '$group', value: type },
        { name: '$order', value: 'total DESC' },
      ],
    );

    return this.govService
      .search(queryString);
  }

  public getTotalCasesByAttention(attention: string) {
    const queryString = uriParser(
      [
        { name: '$select', value: 'COUNT(*) as total' },
        { name: '$where', value: `atenci_n in(${attention})` },
      ],
    );

    return this.govService
      .search(queryString)
      .pipe(
        map(data => data[0]),
      );
  }

  public getCasesByAttention(field: FIELD_TYPES, value: string | number) {
    const queryString = uriParser(
      [
        { name: '$select', value: `${field} as name,COUNT(*) as total` },
        { name: '$group', value: field },
        { name: '$where', value: `atenci_n in('${value}')` },
        { name: '$order', value: 'total DESC' },
      ],
    );

    return this.govService
      .search(queryString)
  }

  public getCases(): Observable<CovidResponse> {
    return new Observable((observer: Observer<any>) => {
      combineLatest(
        this.getTotalCases(),
        this.getCasesByType(FIELD_TYPES.CITY),
        this.getCasesByType(FIELD_TYPES.STATE),
      ).subscribe(([totalCases, casesByCity, casesByState]) => {
        observer.next({ ...totalCases, casesByCity, casesByState });
        observer.complete();
      });
    });
  }

  public getCasesRecovered(): Observable<CovidResponse> {
    return new Observable((observer: Observer<any>) => {
      combineLatest(
        this.getTotalCasesByAttention(`'${ATTENTION_TYPES.RECOVERED}'`),
        this.getCasesByAttention(FIELD_TYPES.CITY, ATTENTION_TYPES.RECOVERED),
        this.getCasesByAttention(FIELD_TYPES.STATE, ATTENTION_TYPES.RECOVERED),
      ).subscribe(([totalCases, casesByCity, casesByState]) => {
        observer.next({ ...totalCases, casesByCity, casesByState });
      }, (err) => {
        observer.error(err);
      }, () => observer.complete());
    });
  }

  public getCasesDeaths(): Observable<CovidResponse> {
    return new Observable((observer: Observer<any>) => {
      combineLatest(
        this.getTotalCasesByAttention(`'${ATTENTION_TYPES.DEATHS}'`),
        this.getCasesByAttention(FIELD_TYPES.CITY, ATTENTION_TYPES.DEATHS),
        this.getCasesByAttention(FIELD_TYPES.STATE, ATTENTION_TYPES.DEATHS),
      ).subscribe(([totalCases, casesByCity, casesByState]) => {
        observer.next({ ...totalCases, casesByCity, casesByState });
      }, (err) => {
        observer.error(err);
      }, () => observer.complete());
    });
  }
}
