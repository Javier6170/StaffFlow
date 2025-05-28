import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from '../../infrastructure/repositories/delivery.repository';

@Injectable()
export class ListDeliveriesUseCase {
  constructor(private readonly repository: DeliveryRepository) {}

  async execute() {
    return this.repository.findAll();
  }
}
