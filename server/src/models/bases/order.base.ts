import { IOrderSchema } from '@interfaces/payment.interface';
import { OrderSchema } from '@models/schemas/order.schema';
import { model } from 'mongoose';

export const OrderModel = model<IOrderSchema>('Order', OrderSchema);
