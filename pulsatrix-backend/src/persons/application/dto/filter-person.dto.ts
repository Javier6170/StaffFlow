import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class FilterPersonDto {
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() department?: string;

  @IsOptional()
  @IsNumberString({}, { message: 'page debe ser un número' })
  page?: string;

  @IsOptional()
  @IsNumberString({}, { message: 'limit debe ser un número' })
  limit?: string;
}