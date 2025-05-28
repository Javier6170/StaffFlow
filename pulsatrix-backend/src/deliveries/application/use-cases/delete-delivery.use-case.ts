/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeliveryRepository } from '../../infrastructure/repositories/delivery.repository';

@Injectable()
export class DeleteDeliveryUseCase {
  constructor(private readonly repository: DeliveryRepository) {}

  async execute(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new NotFoundException('Delivery not found');
    return deleted;
  }
}
