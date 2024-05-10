import { StaticImageData } from 'next/image';

export type BidViewMode = 'comment' | 'process';
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

export interface IProcessItem {
    amount: number;
    time: Date;
    user: IUserInfor;
}

export interface IProductItem {
    name: string;
    image: string | StaticImageData;
    description: string;
    price: number;
    category: string;
    material: string;
    dimensions: string;
    color: string;
    weight: number;
    condition: string;
    style: string;
    manufacturer: string;
    year: number;
    origin: string;
    deposit: number;
    duration: number;
    timeStart: Date;
}

export type ITimeStatus = null | 'soon' | 'starting' | 'late';
export const fakeProcesses: IProcessItem[] = [
    {
        amount: 1000000,
        time: new Date(),
        user: {
            id: '1',
            name: 'Tran Van A',
            avatar: 'https://tq6.mediacdn.vn/133514250583805952/2021/6/9/photo-1-16232229002241474687644.jpg',
        },
    },
    {
        amount: 2000000,
        time: new Date(),
        user: {
            id: '1',
            name: 'Tran Van B',
            avatar: 'https://tq6.mediacdn.vn/133514250583805952/2021/6/9/photo-1-16232229002241474687644.jpg',
        },
    },
    {
        amount: 3000000,
        time: new Date(),
        user: {
            id: '1',
            name: 'Tran Van C',
            avatar: 'https://tq6.mediacdn.vn/133514250583805952/2021/6/9/photo-1-16232229002241474687644.jpg',
        },
    },
    {
        amount: 4000000,
        time: new Date(),
        user: {
            id: '1',
            name: 'Tran Van D',
            avatar: 'https://tq6.mediacdn.vn/133514250583805952/2021/6/9/photo-1-16232229002241474687644.jpg',
        },
    },
    {
        amount: 5000000,
        time: new Date(),
        user: {
            id: '1',
            name: 'Tran Van E',
            avatar: 'https://tq6.mediacdn.vn/133514250583805952/2021/6/9/photo-1-16232229002241474687644.jpg',
        },
    },
];
