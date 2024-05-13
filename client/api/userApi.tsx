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

export { getUser };
