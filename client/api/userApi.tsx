import request from '@/lib/axios';
import { IUser } from '@/types/use.type';

interface IResponseGetUser {
    data: IUser[];
    message?: string;
    status: number;
}

const getUser = async () => {
    var _response: IResponseGetUser = {
        data: [],
        status: 0,
        message: '',
    };
    await request
        .get<IResponseGetUser>('/v1/admin/get-users')
        .then((response) => {
            _response = response.data;
            _response.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _response = error.response.data;
                _response.status = error.response.status;
            }
        });

    return _response;
};

interface IResponseGetBalance {
    data: {
        balance: number;
    };

    message?: string;
    status: number;
}

const getBalance = async (idUser: string) => {
    var _response: IResponseGetBalance = {
        data: {
            balance: -1,
        },
        status: 0,
        message: '',
    };

    await request
        .get<IResponseGetBalance>(`/v1/user/get-balance/${idUser}`)
        .then((response) => {
            _response = response.data;
            _response.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _response = error.response.data;
                _response.status = error.response.status;
            }
        });

    return _response;
};

interface IBiddingProduct {
    userId: string;
    productId: string;
}

interface IResponseBiddingProduct {
    data: {
        _id: string;
        duration: number;
        status: number;
        startTime: string;

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
        message?: string;
    };

    status: number;
}

const biddingProduct = async (data: IBiddingProduct) => {
    var _response: IResponseBiddingProduct = {
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

    await request
        .post<IResponseBiddingProduct>('/v1/user/bidding-product', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
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

export { getUser, getBalance, biddingProduct };
