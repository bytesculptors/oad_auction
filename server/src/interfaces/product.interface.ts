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
    deposit: number;
    description: string;
    duration: number;
    time_start?: Date;
}

export interface IUpdateProduct {
    sellerId: string;
    name?: string;
    image?: string;
    price?: number;
    deposite?: number;
    description?: string;
    duration?: number;
    time_start?: Date;
}
export interface IProductPayload {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    deposit: number;
}

export interface IBiddingData {
    _id: string;
    product: IProductPayload;
    startTime: Date;
    status: number;
    duration: number;
}

export interface IBiddingProduct {
    productId: string;
    userId: string;
}

export interface IFindProduct {
    keyword: string;
}

export interface IQueryProduct {
    status: string;
}

export interface IAdminAcceptProduct {
    _id: string;
    sellerId: string;
    productId: string;
}
