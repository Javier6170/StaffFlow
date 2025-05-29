import { Injectable } from '@nestjs/common';
import { PersonRepository } from '../../infrastructure/repositories/person.repository';
import { FilterPersonDto } from '../dto/filter-person.dto';

@Injectable()
export class ListPersonsUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(filter: FilterPersonDto) {
    const page  = parseInt(filter.page  ?? '1', 10);
    const limit = parseInt(filter.limit ?? '10', 10);

    // Construye tu filtro Mongo según campos opcionales
    const mongoFilter: Record<string, any> = {};
    if (filter.firstName) {
      mongoFilter.firstName = { $regex: filter.firstName, $options: 'i' };
    }
    if (filter.department) {
      mongoFilter.department = filter.department;
    }

    const { items, total } = await this.repository.paginate(
      mongoFilter,
      page,
      limit
    );

    return { items, total, page, limit };
  }
}