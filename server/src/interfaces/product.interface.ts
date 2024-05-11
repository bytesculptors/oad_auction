import { ObjectId } from 'mongoose';
import { Document } from 'mongoose';

export interface ISchemaProduct extends Document {
    sellerId: ObjectId;
    name: string;
    description: string;
    image: string;
    price: number;
    deposit: number;
    category: string;
    material: string;
    dimension: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
}

export interface ICreateProduct {
    sellerId: string;
    name: string;
    image: string;
    price: number;
    deposit: number;
    description: string;
    duration: number;
    startTime?: Date;
    category: string;
    material: string;
    dimension: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
}

export interface IUpdateProduct {
    sellerId: string;
    name?: string;
    image?: string;
    price?: number;
    deposite?: number;
    description?: string;
    duration?: number;
    startTime?: Date;
    category?: string;
    material?: string;
    dimension?: string;
    color?: string;
    weight?: string;
    condition?: string;
    style?: string;
    manufacturer?: string;
    year?: number;
    origin?: string;
}

export interface IProductPayload {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    deposit: number;
    category: string;
    material: string;
    dimension: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
}

export interface IProductItem extends IProductPayload {}

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
    keyword?: string;
    limit?: number;
    page?: number;
}

export interface IQueryProduct {
    status: string;
}

export interface IAdminAcceptProduct {
    _id: string;
    sellerId: string;
    productId: string;
}
