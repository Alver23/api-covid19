// Dependencies
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class GovService {
  private url: string;
  private headers: any;
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    const gov = this.configService.get('GOV');
    this.url = `${gov.BASE_URL}${gov.PATH}`;
    this.headers = {
      'X-App-Token': gov.TOKEN,
    };
  }

  search(query: string): Observable<any> {
    const url = `${this.url}?${query}`;
    return this.httpService.get(url, { headers: { ...this.headers } }).pipe(map(response => response.data));
  }
}
