import { ISchemaProduct } from '@interfaces/product.interface';
import { Schema, Types } from 'mongoose';

export const ProductSchema = new Schema<ISchemaProduct>(
    {
        sellerId: {
            type: Types.ObjectId,
            required: true,
        },
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
        deposit: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

ProductSchema.index({ name: 'text' });
