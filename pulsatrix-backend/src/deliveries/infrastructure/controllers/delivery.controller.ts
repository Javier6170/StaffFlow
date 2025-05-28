import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateDeliveryUseCase } from '../../application/use-cases/create-delivery.use-case';
import { ListDeliveriesUseCase } from '../../application/use-cases/list-deliveries.use-case';
import { DeleteDeliveryUseCase } from '../../application/use-cases/delete-delivery.use-case';
import { CreateDeliveryDto } from '../../application/dto/create-delivery.dto';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/auth.guard';

@Controller('api/v1/deliveries')
@UseGuards(JwtAuthGuard)
export class DeliveryController {
  constructor(
    private readonly createDelivery: CreateDeliveryUseCase,
    private readonly listDeliveries: ListDeliveriesUseCase,
    private readonly deleteDelivery: DeleteDeliveryUseCase
  ) {}

  @Post()
  create(@Body() dto: CreateDeliveryDto) {
    return this.createDelivery.execute(dto);
  }

  @Get()
  findAll() {
    return this.listDeliveries.execute();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteDelivery.execute(id);
  }
}
