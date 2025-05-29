import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpException, HttpStatus, HttpCode, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CreatePersonUseCase } from '../../application/use-cases/create-person.use-case';
import { UpdatePersonUseCase } from '../../application/use-cases/update-person.use-case';
import { DeletePersonUseCase } from '../../application/use-cases/delete-person.use-case';
import { CreatePersonDto } from '../../application/dto/create-person.dto';
import { UpdatePersonDto } from '../../application/dto/update-person.dto';
import { FilterPersonDto } from '../../application/dto/filter-person.dto';

import { PersonRepository } from '../repositories/person.repository';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { ListPersonsUseCase } from 'src/persons/application/use-cases/list-persons.use-case';


@Controller('api/v1/persons')
@UseGuards(JwtAuthGuard)
export class PersonController {
  constructor(
    private readonly createPerson: CreatePersonUseCase,
    private readonly updatePerson: UpdatePersonUseCase,
    private readonly deletePerson: DeletePersonUseCase,
    private readonly listPersons: ListPersonsUseCase,
    private readonly personRepository: PersonRepository
  ) { }

  @Post()
  @HttpCode(200)
  async create(@Body() dto: CreatePersonDto) {
    try {
      const person = await this.createPerson.execute(dto);
      return { message: 'Empleado registrado con éxito', data: person };
    } catch (error) {
      throw new HttpException({ message: 'Error al registrar', error }, HttpStatus.BAD_REQUEST);
    }
  }

   @Get()
  async findAll(
    @Query() filterDto: FilterPersonDto,
    @Query('page',  new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    try {
      // Inyectamos page & limit en el DTO para pasarlo al UseCase
      filterDto.page  = page.toString();
      filterDto.limit = limit.toString();

      const { items, total } = await this.listPersons.execute(filterDto);

      return {
        data: items,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error al obtener los empleados', error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const person = await this.personRepository.findById(id);
      if (!person) {
        throw new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);
      }
      return { data: person };
    } catch (error) {
      throw new HttpException({ message: 'Error al buscar empleado', error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePersonDto) {
    try {
      const updated = await this.updatePerson.execute(id, dto);
      return { message: 'Empleado actualizado', data: updated };
    } catch (error) {
      throw new HttpException({ message: 'Error al actualizar', error }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.deletePerson.execute(id);
      return { message: 'Empleado eliminado' };
    } catch (error) {
      throw new HttpException({ message: 'Error al eliminar empleado', error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

   @Get('stats/by-department')
  async statsByDepartment() {
    try {
      const result = await this.personRepository.aggregate([
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $project: { department: '$_id', count: 1, _id: 0 } }
      ]);
      return { data: result };
    } catch (err) {
      throw new HttpException('Error al obtener estadísticas por departamento', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

   @Get('stats/by-month')
  async statsByMonth() {
    try {
      const result = await this.personRepository.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$hireDate' } },
            hires: { $sum: 1 }
          }
        },
        { $sort: { '_id': 1 } },
        { $project: { month: '$_id', hires: 1, _id: 0 } }
      ]);
      return { data: result };
    } catch (err) {
      throw new HttpException('Error al obtener contrataciones por mes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
