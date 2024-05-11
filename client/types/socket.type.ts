import { Socket } from 'socket.io-client';
import { IProductItem } from './bid.type';

export interface ISocketState {
    socket: Socket;
    isConnected: boolean;
}

export interface IClientUser {
    userId: string;
    name: string;
}

export interface IOnlineUser {
    userId: string;
    socketId: string;
    name: string;
}

export interface IJoinRoom {
    roomId: string;
    user: IClientUser;
}

export interface IResponseJoinRoom {
    price: number;
    user: IClientUser;
    startTime: Date;
    duration: number;
    product?: IProductItem;
}

export interface IBiddingRoom {
    users: IOnlineUser[];
    price: number;
    startTime: Date;
    duration: number;
    winner?: IClientUser;
}

export interface IPlaceBid extends IJoinRoom {
    amount: number;
}

export interface IPlaceBidResponse extends IClientUser {
    price: number;
    time: Date;
}

export interface IWinnderResponse extends IPlaceBidResponse {}

export type IUserJoinedCallBack = (response: IResponseJoinRoom) => void;
export type IBidSuccessCallBack = (response: IPlaceBidResponse) => void;
