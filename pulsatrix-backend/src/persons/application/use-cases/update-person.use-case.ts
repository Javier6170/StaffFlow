import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PersonRepository } from '../../infrastructure/repositories/person.repository';

@Injectable()
export class UpdatePersonUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(id: string, dto: UpdatePersonDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const person = await this.repository.update(id, dto);
    if (!person) throw new NotFoundException('Person not found');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return person;
  }
}
