/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRepository } from '../../infrastructure/repositories/person.repository';

@Injectable()
export class DeletePersonUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(id: string) {
    const result = await this.repository.delete(id);
    if (!result) throw new NotFoundException('Person not found');
    return result;
  }
}
