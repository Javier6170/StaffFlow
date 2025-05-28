import { Schema } from 'mongoose';

export const DeliverySchema = new Schema({
  personId: { type: String, required: true },
  item: { type: String, required: true },
  deliveryDate: { type: Date, required: true }
});
