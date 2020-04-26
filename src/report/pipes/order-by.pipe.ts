import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OrderByPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const data = {...value};
    data.orderBy = -1;

    if (value && value.orderBy === 'asc') {
      data.orderBy = 1;
    }

    return data;
  }
}
