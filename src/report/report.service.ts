// Dependencies
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

// Models
import { Covid } from './../interfaces/covid.interface';

// Dto
import { ReportDto } from './dto/report-dto';
import { GovService } from '../lib/gov/gov.service';

@Injectable()
export class ReportService {

  private aggregate: any[] = [];

  constructor(
    @InjectModel('Covid') private covidModel: Model<Covid>,
    private readonly covidService: GovService,
  ) {
  }

  private set Aggregate(params: any) {
    this.aggregate = [{...params}, ...this.Aggregate];
  }

  private get Aggregate() {
    return this.aggregate;
  }

  private cleanAggregate() {
    this.aggregate = [];
  }

  private getGroup(type: string) {
    return {
      $group: {
        _id: type ? `$${type}` : null,
        count: { $sum: 1 },
      },
    }
  }

  private getSort(order) {
    return {
      $sort: {
        count: order,
      },
    }
  }

  private getMatch(type: string, value: string) {
    return { $match : { [type] : value } };
  }

  async reportByType(reportDto: ReportDto): Promise<any> {
    const { type, orderBy, value, field } = reportDto;
    this.cleanAggregate();
    this.Aggregate = this.getSort(orderBy);
    this.Aggregate = this.getGroup(type);
    if (value && field) { this.Aggregate = this.getMatch(field, value); }
    return this.covidModel
      .aggregate([
        ...this.aggregate,
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1,
          }
        }
      ]);
  }

  buildReport(queryString: any) {
    let query = '';
    if (queryString) {
      query += '?';
      Object.entries(queryString)
        .forEach(([key, value]) => {
          query += `${key}=${value}&`;
      });
    }
    return this.covidService
      .search(query);
  }
}
