import request from '@/lib/axios';
import { IProduct } from '@/types/product.type';

export interface ICreateProduct {
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

const createProductApi = async (data: any) => {
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
        .post<IResponseCreateProduct>('/v1/seller/create-product', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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

interface IGetProduct {
    sellerId: string;
}

interface IResponProduct {
    data: IProduct[];
    status: number;
    message?: string;
}

const getProductByIdSeller = async (data: IGetProduct, status?: number) => {
    console.log(data);

    var _response: IResponProduct = {
        data: [],
        status: 0,
        message: '',
    };
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:4848/v1/seller/get-products/${data.sellerId}?status${status}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    await request
        .request<IResponProduct>(config)
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
    // console.log(_response);
    return _response;
};

interface _IResponseAdminGetProduct extends IProduct {
    sellerId: {
        _id: string;
        name: string;
    };
}

interface IResponseAdminGetProduct {
    data: _IResponseAdminGetProduct[];
    status: number;
    messeage?: string;
}

const adminGetProduct = async (status?: number) => {
    var _response: IResponseAdminGetProduct = {
        data: [],
        status: -1,
        messeage: '',
    };

    await request
        .get<IResponseAdminGetProduct>('/v1/admin/get-products', {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                status: status,
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
    // console.log(_response);
    return _response;
};

export { createProductApi, getProductByIdSeller, adminGetProduct };
