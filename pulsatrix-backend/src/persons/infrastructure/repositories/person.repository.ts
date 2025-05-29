/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDto } from '../../application/dto/create-person.dto';
import { UpdatePersonDto } from '../../application/dto/update-person.dto';

@Injectable()
export class PersonRepository {
  constructor(@InjectModel('Person') private readonly model: Model<any>) {}

  async create(dto: CreatePersonDto) {
    return this.model.create(dto);
  }

  async findAll(page = 1, limit = 10) {
    return this.model.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }


  async findById(id: string) {
    return this.model.findById(id).exec();
  }


  async update(id: string, dto: UpdatePersonDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
