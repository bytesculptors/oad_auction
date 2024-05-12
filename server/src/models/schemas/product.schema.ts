import { IProductSchema } from '@interfaces/product.interface';
import { Schema, Types } from 'mongoose';

export const ProductSchema = new Schema<IProductSchema>(
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
        material: {
            type: String,
            required: true,
        },
        dimension: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        manufacturer: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        style: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

ProductSchema.index({ name: 'text', category: 'text', year: 'text', description: 'text' });
