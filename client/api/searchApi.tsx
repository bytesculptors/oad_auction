import request from '@/lib/axios';

export interface IProduct {
    duration: number;
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
    startTime: string;
    status: number;
    userStatus: number;
    _id: string;
}

interface IResponseGetProducts {
    data: IProduct[];
    status: number;
}

const getProductForUserApi = async (userId: string, status: number) => {
    const _response: IResponseGetProducts = {
        data: [],
        status: -1,
    };

    await request
        .get<IResponseGetProducts>(`/v1/user/find-product/${userId}`, {
            params: {
                status: status,
            },
        })
        .then((response) => {
            _response.data = response.data.data;
            _response.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _response.data = error.response.data;
                _response.status = error.response.status;
            }
        });
    // console.log(_response);
    return _response;
};

const searchProductsApi = async (keyword?: string, page?: number, status?: number) => {
    const _response: IResponseGetProducts = {
        data: [],
        status: 0,
    };

    await request
        .get<IResponseGetProducts>(`/v1/user/find-product`, {
            params: {
                keyword: keyword,
                page: page,
                status: status,
            },
        })
        .then((response) => {
            _response.data = response.data.data;
            _response.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _response.data = error.response.data;
                _response.status = error.response.status;
            }
        });
    console.log(_response);
    return _response;
};
export { searchProductsApi, getProductForUserApi };
