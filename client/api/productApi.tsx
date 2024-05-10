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
        duration: number;
        status: number;
        startTime: string;
        message?: string;
        product: {
            _id: string;
            name: string;
            price: number;
            deposit: number;
            description: string;
            image: string;
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
        };
    };

    status: number;
}

const createProductApi = async (data: ICreateProduct) => {
    var _response: IResponseCreateProduct = {
        data: {
            _id: '',
            duration: 0,
            product: {
                _id: '',
                category: '',
                color: '',
                condition: '',
                deposit: 0,
                description: '',
                dimension: '',
                image: '',
                manufacturer: '',
                material: '',
                name: '',
                origin: '',
                price: 0,
                style: '',
                weight: 0,
                year: 0,
            },
            startTime: '',
            status: 0,
            message: '',
        },
        status: 0,
    };
    console.log(data);

    await request
        .post<IResponseCreateProduct>('/v1/seller/create-product', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            _response.data = response.data.data;
            _response.status = response.status;
        })
        .catch((e) => {
            if (e.response) {
                _response.data = e.response.data;
                _response.status = e.response.status;
            }
        });
    console.log(_response);
    return _response;
};

export { createProductApi };
