import { IsString, IsEmail, IsDateString, IsNumber } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsString()
  department: string;

  @IsDateString()
  hireDate: string;

  @IsNumber()
  salary: number;
}
