import { IOrderSchema } from '@interfaces/payment.interface';
import { Schema, Types } from 'mongoose';

export const OrderSchema = new Schema<IOrderSchema>(
    {
        user: {
            type: Types.ObjectId,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        command: {
            type: String,
            required: true,
            default: 'pay',
        },
        bankCode: {
            type: String,
            default: 'NCB',
        },
        currCode: {
            type: String,
            required: true,
            default: 'VND',
        },
        infor: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        txnRef: {
            type: String,
            required: true,
        },
        returnUrl: {
            type: String,
            required: true,
        },
        createDate: {
            type: String,
            required: true,
        },
        expireDate: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
