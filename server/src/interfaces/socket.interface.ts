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
}

export interface IWinnderResponse extends IPlaceBidResponse {}
