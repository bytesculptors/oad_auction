import { Document } from 'mongoose';

export interface ISchemaUser extends Document {
    name: string;
    email: string;
    password: string;
    balance: number;
    role: string;
}

export interface IResponseData {
    accessToken?: string;
    data?: any;
    message?: string;
}

export interface ILocalData extends Record<string, any> {
    accessToken?: string;
}

export interface ILoginByPassword {
    email: string;
    password: string;
}

export interface IRegisterByPassword {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export interface IFireBase {
    isNewUser: boolean;
    name: string;
    email: string;
    password: string;
}

export interface IUserPayload {
    _id: string;
    email: string;
    name: string;
    role: string;
    balance: number;
}
