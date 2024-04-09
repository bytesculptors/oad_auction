export interface ICreateProduct {
    name: string;
    image: string;
    price: number;
    description: string;
    duration: number;
    time_start?: Date;
}

export interface IProductPayload {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    duration: number;
    time_start: Date;
}
