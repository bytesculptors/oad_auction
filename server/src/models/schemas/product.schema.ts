import { defautStartDate } from '@utils/date.util';
import { Schema } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    image: string;
    price: number;
    winner: string | null;
    time_start: Date;
    duration: number;
}

export const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        winner: {
            type: String,
        },
        duration: {
            type: Number,
            required: true,
        },
        time_start: {
            type: Date,
            default: defautStartDate,
        },
    },
    {
        timestamps: true,
    },
);
