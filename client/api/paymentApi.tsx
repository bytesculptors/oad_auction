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

const getCreateOrder = async (data: ICreateOrder) => {
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
        .post<IResponseCreateOrder>('/v1/payment/create-order', JSON.stringify(data), {
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

export { getCreateOrder };
