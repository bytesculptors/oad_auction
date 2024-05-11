import { IProductItem } from './product.interface';

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
    product?: IProductItem;
}

export interface IPlaceBid extends IJoinRoom {
    amount: number;
}

export interface IPlaceBidResponse extends IClientUser {
    price: number;
    time: Date;
}

export interface IWinnerResponse extends IPlaceBidResponse {}
export interface INewComment extends IJoinRoom {
    message: string;
    avatar: string;
}

export interface IUserInfor {
    id: string;
    name: string;
    avatar: string;
}
export interface ICommentItem {
    content: string;
    time: Date;
    user: IUserInfor;
}
