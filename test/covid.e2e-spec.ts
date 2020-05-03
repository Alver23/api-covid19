// Dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Modules
import { CovidModule } from '../src/api/covid/covid.module';

// Services
import { CovidService } from '../src/api/covid/services/covid.service';
import { GovModule } from '../src/lib/gov/gov.module';
import { ConfigService } from '@nestjs/config';
import { GovService } from '../src/lib/gov/gov.service';
import { GovServiceMock } from '../src/lib/gov/gov-service-mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const covidService = {
    getCases: () => ({ total: 1 }),
    getCasesRecovered: () => ({ total: 1 }),
    getCasesDeaths: () => ({ total: 1 }),
  };

  beforeEach(async () => {
    const mdduleRef: TestingModule = await Test.createTestingModule({
      imports: [CovidModule, GovModule],
      providers: [ConfigService],
    })
      .overrideProvider(CovidService)
      .useValue(covidService)
      .overrideProvider(GovService)
      .useClass(GovServiceMock)
      .compile();

    app = mdduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('cases', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/cases')
        .expect(200)
        .expect({
          total: 1,
        });
    });

    it('/recovered (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/cases/recovered')
        .expect(200)
        .expect({
          total: 1,
        });
    });

    it('/recovered (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/cases/deaths')
        .expect(200)
        .expect({
          total: 1,
        });
    });
  });
});
