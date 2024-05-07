export interface IDataAuctionProgress {
    bid: number;
    name: string;
    time: string;
    isOwn: boolean;
}

export interface IAuctionProgress {
    data: IDataAuctionProgress[];
}
