import request from '@/lib/axios';

interface IRequestReview {
    sellerId: string;
}

interface IResponseRequestReview {
    data: string;
    message?: string;
    status: number;
}

const requestReviewApi = async (data: IRequestReview, idProduct: string) => {
    var _response: IResponseRequestReview = {
        data: '',
        status: 0,
        message: '',
    };

    await request
        .post<IResponseRequestReview>(`/v1/seller/request-review/${idProduct}`, data, {
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
    // console.log(_response);
    return _response;
};

export { requestReviewApi };
