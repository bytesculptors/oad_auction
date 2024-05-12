import request from '@/lib/axios';

interface IApproveProduct {
    sellerId: string;
    _id: string;
    productId: string;
}

interface IResponseApprove {
    message: string;
    status: number;
}

const approveProduct = async (data: IApproveProduct, status: number) => {
    var _response: IResponseApprove = {
        message: '',
        status: 0,
    };

    await request
        .post<IResponseApprove>('/v1/admin/review-product', data, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                status: status,
            },
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
        });

    return _response;
};

export { approveProduct };
