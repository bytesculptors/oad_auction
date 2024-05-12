import { StaticImageData } from 'next/image';

export type BidViewMode = 'comment' | 'process';
export interface IUserInfor {
    id: string;
    name: string;
    avatar: string;
}
export interface ICommentItem {
    content: string;
    time: Date;
    user: IUserInfor;
}

export interface IProcessItem {
    amount: number;
    time: Date;
    user: IUserInfor;
}

export interface IProductItem {
    _id: string;
    name: string;
    image: string | StaticImageData;
    description: string;
    price: number;
    category: string;
    material: string;
    dimensions: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
    deposit: number;
}

export type ITimeStatus = null | 'soon' | 'starting' | 'late';
