import request from '@/lib/axios';

interface ICreateProduct {
    sellerId: string;
    name: string;
    price: number;
    deposit: number;
    description: string;
    duration: number;
    image: string;
    category: string;
    material: string;
    dimension: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: string;
    origin: string;
}

interface IResponseCreateProduct {
    data: {
        _id: string;
        name: string;
        image: string;
        price: string;
        description: string;
        status: number;
        biddingSessionId: string;
    };
}

const createProduct = (data: ICreateProduct) => {
    request.post<>;
};
