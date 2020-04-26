import { IsIn, IsOptional } from 'class-validator';

export class ReportDto {

  @IsIn(['city', 'state', 'age', 'gender', 'attention'])
  @IsOptional()
  readonly type: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  readonly orderBy: string;

  @IsOptional()
  readonly value: string;

  @IsIn(['city', 'state', 'age', 'gender', 'attention'])
  @IsOptional()
  readonly field: string
}
