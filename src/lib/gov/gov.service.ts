// Dependencies
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class GovService {
	private url: string;
	constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
		const gov = this.configService.get('GOV');
		this.url = `${gov.BASE_URL}${gov.PATH}`;
	}

	search(query: string): Observable<any> {
		const url = `${this.url}?${query}`;
		return this.httpService.get(url).pipe(map(response => response.data));
	}
}
