import { Injectable } from '@nestjs/common';
import { PersonRepository } from '../../infrastructure/repositories/person.repository';
import { FilterPersonDto } from '../dto/filter-person.dto';

@Injectable()
export class ListPersonsUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(filter: FilterPersonDto) {
    return this.repository.findAll(filter.page, filter.limit);
  }
}
