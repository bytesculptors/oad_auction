import { ObjectId } from 'mongoose';
import { Document } from 'mongoose';

export interface ISchemaProduct extends Document {
    sellerId: ObjectId;
    name: string;
    description: string;
    image: string;
    price: number;
    deposit: number;
}

export interface ICreateProduct {
    sellerId: string;
    name: string;
    image: string;
    price: number;
    deposite: number;
    description: string;
    duration: number;
    time_start?: Date;
}

export interface IProductPayload {
    _id: string;
    // biddingSessionId: string;
    name: string;
    image: string;
    price: number;
    description: string;
    // status: number;
}

export interface IBiddingProduct {
    productId: string;
    userId: string;
}

export interface IFindProduct {
    keyword: string;
}
