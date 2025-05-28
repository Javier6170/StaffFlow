/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { DeliveryRepository } from '../../infrastructure/repositories/delivery.repository';

@Injectable()
export class CreateDeliveryUseCase {
  constructor(private readonly repository: DeliveryRepository) {}

  async execute(dto: CreateDeliveryDto) {
    return this.repository.create(dto);
  }
}
