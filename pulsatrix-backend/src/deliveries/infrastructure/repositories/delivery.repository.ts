/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeliveryDto } from '../../application/dto/create-delivery.dto';

@Injectable()
export class DeliveryRepository {
  constructor(@InjectModel('Delivery') private readonly model: Model<any>) {}

  async create(dto: CreateDeliveryDto) {
    return this.model.create(dto);
  }

  async findAll() {
    return this.model.find().exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
