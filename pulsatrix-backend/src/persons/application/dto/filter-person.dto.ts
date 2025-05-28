import { IsOptional, IsNumberString } from 'class-validator';

export class FilterPersonDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
