import request from '@/lib/axios';

interface ICreateOrder {
    amount: number;
    language: 'vn';
    orderDescription: string;
    orderType: string;
}

interface IResponseCreateOrder {
    data: {
        url: string;
        createDate: string;
        expiredDate: string;
        message?: string;
    };
    status: number;
}

const getCreateOrder = async (data: ICreateOrder, userId: string) => {
    console.log(data);

    var _response: IResponseCreateOrder = {
        data: {
            url: '',
            createDate: '',
            expiredDate: '',
            message: '',
        },
        status: 0,
    };

    await request
        .post<IResponseCreateOrder>(`/v1/payment/create-order/${userId}`, JSON.stringify(data), {
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

interface IPayProduct {
    _id: string;
    productId: string;
}

interface IResponPayProduct {
    data: {
        data: string;
        message?: string;
    };
    _id?: string;
    status: number;
}

const payProduct = async (data: IPayProduct, idUser: string) => {
    var _response: IResponPayProduct = {
        data: {
            message: '',
            data: '',
        },
        status: -1,
    };

    await request
        .post<IResponPayProduct>(`/v1/payment/pay-product/${idUser}`, {
            _id: data._id,
            productId: data.productId,
        })
        .then((response) => {
            _response = response.data;
            _response.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _response = error.response.data;
                _response.status = error.response.status;
            }
        })
        .finally(() => {
            _response._id = data._id;
        });

    console.log(_response);

    return _response;
};

export { getCreateOrder, payProduct };
