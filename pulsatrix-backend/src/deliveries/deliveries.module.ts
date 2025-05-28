import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliverySchema } from './infrastructure/schemas/delivery.schema';
import { DeliveryController } from './infrastructure/controllers/delivery.controller';
import { CreateDeliveryUseCase } from './application/use-cases/create-delivery.use-case';
import { ListDeliveriesUseCase } from './application/use-cases/list-deliveries.use-case';
import { DeleteDeliveryUseCase } from './application/use-cases/delete-delivery.use-case';
import { DeliveryRepository } from './infrastructure/repositories/delivery.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Delivery', schema: DeliverySchema }])
  ],
  controllers: [DeliveryController],
  providers: [
    CreateDeliveryUseCase,
    ListDeliveriesUseCase,
    DeleteDeliveryUseCase,
    DeliveryRepository
  ]
})
export class DeliveriesModule {}
