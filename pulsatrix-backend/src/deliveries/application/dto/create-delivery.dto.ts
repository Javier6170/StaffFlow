import { IsString, IsDateString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  personId: string;

  @IsString()
  item: string;

  @IsDateString()
  deliveryDate: string;
}
