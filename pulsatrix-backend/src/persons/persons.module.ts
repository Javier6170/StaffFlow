import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './infrastructure/schemas/person.schema';
import { PersonController } from './infrastructure/controllers/person.controller';
import { CreatePersonUseCase } from './application/use-cases/create-person.use-case';
import { UpdatePersonUseCase } from './application/use-cases/update-person.use-case';
import { DeletePersonUseCase } from './application/use-cases/delete-person.use-case';
import { ListPersonsUseCase } from './application/use-cases/list-persons.use-case';
import { PersonRepository } from './infrastructure/repositories/person.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
    AuthModule
  ],
  controllers: [PersonController],
  providers: [
    CreatePersonUseCase,
    UpdatePersonUseCase,
    DeletePersonUseCase,
    ListPersonsUseCase,
    PersonRepository
  ]
})
export class PersonsModule {}
