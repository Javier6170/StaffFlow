import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CreatePersonUseCase } from '../../application/use-cases/create-person.use-case';
import { UpdatePersonUseCase } from '../../application/use-cases/update-person.use-case';
import { DeletePersonUseCase } from '../../application/use-cases/delete-person.use-case';
import { ListPersonsUseCase } from '../../application/use-cases/list-persons.use-case';
import { CreatePersonDto } from '../../application/dto/create-person.dto';
import { UpdatePersonDto } from '../../application/dto/update-person.dto';
import { FilterPersonDto } from '../../application/dto/filter-person.dto';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/auth.guard';

@Controller('api/v1/persons')
@UseGuards(JwtAuthGuard)
export class PersonController {
  constructor(
    private readonly createPerson: CreatePersonUseCase,
    private readonly updatePerson: UpdatePersonUseCase,
    private readonly deletePerson: DeletePersonUseCase,
    private readonly listPersons: ListPersonsUseCase
  ) {}

  @Post()
  create(@Body() dto: CreatePersonDto) {
    return this.createPerson.execute(dto);
  }

  @Get()
  findAll(@Query() filter: FilterPersonDto) {
    return this.listPersons.execute(filter);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePersonDto) {
    return this.updatePerson.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletePerson.execute(id);
  }
}
