import { Test, TestingModule } from '@nestjs/testing';
import { GovService } from './gov.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';

describe('CovidService', () => {
  let service: GovService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GovService, { provide: ConfigService, useValue: { get: () => jest.fn() } }],
    }).compile();

    service = moduleRef.get<GovService>(GovService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search method', () => {
    it('should get a response successfully', done => {
      const spy = jest.spyOn(httpService, 'get').mockReturnValue(of({ data: 'fake data' } as any));
      service.search('').subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        done();
      });
    });

    it('should get an error', done => {
      const errors: Error = new Error('opps');
      const spy = jest.spyOn(httpService, 'get').mockReturnValue(throwError(errors));
      service.search('').subscribe(
        () => {},
        () => {
          expect(spy).toBeCalledTimes(1);
          done();
        },
      );
    });
  });
});
