import { IPaymentSchema } from '@interfaces/payment.interface';
import { PaymentSchema } from '@models/schemas/payment.schema';
import { model } from 'mongoose';

export const PaymentModel = model<IPaymentSchema>('Payment', PaymentSchema);
