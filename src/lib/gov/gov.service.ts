// Dependencies
import { Observable, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Gov } from './models/gov';
import { AxiosResponse } from 'axios';

import { GovNamespace, GovResponseNamespace } from '../gov.interface';
import IDataResponse = GovNamespace.IDataResponse;
import IResponse = GovResponseNamespace.IDataResponse;

@Injectable()
export class GovService {
  private url: string;
  private headers: any;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const gov = this.configService.get('GOV');
    this.url = `${gov.BASE_URL}${gov.PATH}`;
    this.headers = {
      'X-App-Token': gov.TOKEN,
    };
  }

  findAll(): Observable<IResponse[]> {
    const gov = this.configService.get('GOV');
    const url = `${gov.BASE_URL}${gov.PATH}?$limit=5`;
    return this.httpService.get(url)
      .pipe(
        map((response: AxiosResponse<IDataResponse[]>) => response.data),
        map((items: IDataResponse[]) => items
          .map(item => ({...new Gov(item)}))),
      )
  }

  search(query: string) {
    const url = `${this.url}?${query}`;
    return this.httpService.get(url, { headers: {...this.headers } })
      .pipe(
        map((response) => response.data),
      );
  }
}
