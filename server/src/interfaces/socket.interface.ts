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

export interface IBiddingRoom {
    users: IOnlineUser[];
    price: number;
    winner?: IOnlineUser;
}
