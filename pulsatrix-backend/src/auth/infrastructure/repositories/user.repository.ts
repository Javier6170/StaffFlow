/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from '../../application/dto/signup.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly model: Model<any>) {}

  async findByEmail(email: string) {
    return this.model.findOne({ email }).exec();
  }

  async create(data: SignupDto & { password: string }) {
    return this.model.create(data);
  }
}
