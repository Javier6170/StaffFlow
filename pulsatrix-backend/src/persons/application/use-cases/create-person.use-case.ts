/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../dto/create-person.dto';
import { PersonRepository } from '../../infrastructure/repositories/person.repository';

@Injectable()
export class CreatePersonUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(dto: CreatePersonDto) {
    return this.repository.create(dto);
  }
}
