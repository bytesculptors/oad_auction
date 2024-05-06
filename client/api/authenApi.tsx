import request from '@/lib/axios';
import { redirect } from 'next/navigation';

export interface registerApiProps {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface IResponseRegister {
    data: {
        _id: string;
        email: string;
        role: string;
        balance: number;
        message?: string;
        name: string;
    };

    status: number;
}

export const registerApi = async (data: registerApiProps) => {
    var _resopnse: IResponseRegister = {
        data: {
            _id: '',
            balance: 0,
            email: '',
            role: '',
            message: '',
            name: '',
        },

        status: 0,
    };
    await request
        .post<IResponseRegister>('/v1/auth/register', data)
        .then((response) => {
            _resopnse.data = response.data.data;
            _resopnse.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _resopnse.data = error.response.data;
                _resopnse.status = error.response.status;
            }
        });

    return _resopnse;
};

interface loginApiProps {
    password: string;
    email: string;
}

interface IResponseLogin extends IResponseRegister {}

export const loginApi = async (data: loginApiProps) => {
    var _resopnse: IResponseLogin = {
        data: {
            _id: '',
            balance: 0,
            email: '',
            role: '',
            message: '',
            name: '',
        },

        status: 0,
    };

    await request
        .post<IResponseLogin>('/v1/auth/login', data)
        .then((response) => {
            _resopnse.data = response.data.data;
            _resopnse.status = response.status;
        })
        .catch((error) => {
            if (error.response) {
                _resopnse.data = error.response.data;
                console.log(_resopnse.data);

                _resopnse.status = error.response.status;
            }
        });

    return _resopnse;
};
