import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PersonsModule } from './persons/persons.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import configuration from './config/configuration';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    AuthModule,
    PersonsModule,
    DeliveriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
