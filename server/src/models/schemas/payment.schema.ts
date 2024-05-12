import { IPaymentSchema } from '@interfaces/payment.interface';
import { Schema, Types } from 'mongoose';

export const PaymentSchema = new Schema<IPaymentSchema>(
    {
        user: {
            type: Types.ObjectId,
            required: true,
        },
        order: {
            type: Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        bankTransId: {
            type: String,
            required: true,
        },
        transId: {
            type: String,
            required: true,
        },
        payDate: {
            type: String,
            required: true,
        },
        cartType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
