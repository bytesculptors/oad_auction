import ProductStatus from '@constants/status';
import { IProductItem } from '@interfaces/product.interface';
import {
    IBiddingRoom,
    ICommentItem,
    IJoinRoom,
    INewComment,
    IOnlineUser,
    IPlaceBid,
    IPlaceBidResponse,
    IResponseJoinRoom,
    IWinnerResponse,
} from '@interfaces/socket.interface';
import { BiddingSessionModel } from '@models/bases/bidding-session.base';
import { ProductModel } from '@models/bases/product.base';
import { Server } from 'socket.io';

const rooms: Map<string, IBiddingRoom> = new Map();

const userExistIndex = (room: IBiddingRoom, user: IOnlineUser): number => {
    const index = room.users.findIndex((u) => u.userId === user.userId);
    return index;
};

const onAddingOnlineUser = async (roomId: string, user: IOnlineUser): Promise<IResponseJoinRoom> => {
    if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        if (room && userExistIndex(room, user) < 0) rooms.set(roomId, { ...room, users: [...room.users, user] });
    } else {
        try {
            const biddingSession = await BiddingSessionModel.findById(roomId);
            const product = await ProductModel.findById(biddingSession?.product);
            if (product) {
                rooms.set(roomId, {
                    price: product?.price || 0,
                    users: [user],
                    startTime: biddingSession?.startTime as Date,
                    duration: biddingSession?.duration as number,
                    product: product as IProductItem,
                });
            }
        } catch (error) {
            console.log(error);
            rooms.set(roomId, {
                price: 0,
                users: [user],
                startTime: new Date(),
                duration: 60,
            });
        }
    }
    return {
        price: rooms.get(roomId)?.price || 0,
        user,
        duration: rooms.get(roomId)?.duration || 50,
        startTime: rooms.get(roomId)?.startTime || new Date(),
        product: rooms.get(roomId)?.product,
    };
};

const onRemoveOnlineUser = (roomId: string, user: IOnlineUser): void => {
    if (!rooms.has(roomId)) return;
    const room = rooms.get(roomId);
    if (!room) return;
    if (userExistIndex(room, user) < 0) return;
    room.users.splice(userExistIndex(room, user), 1);
    rooms.set(roomId, { ...room, users: room.users });
};

const onRemoveRoom = (roomId: string): void => {
    if (rooms.has(roomId)) rooms.delete(roomId);
};

const updateWinnderBiddingSession = async (roomId: string, price: number, winnerId: string): Promise<any> => {
    try {
        const biddingSession = await BiddingSessionModel.findOneAndUpdate(
            { _id: roomId },
            { winnerId, status: ProductStatus.SOLD },
            { upsert: true },
        );
        if (!biddingSession) return undefined;
        const product = await ProductModel.findOneAndUpdate({ _id: biddingSession?.product }, { price });
        return biddingSession;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const socketConfig = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('User connected: ', socket.id);

        socket.on('join-room', async ({ roomId, user }: IJoinRoom) => {
            socket.join(roomId);
            const response: IResponseJoinRoom = await onAddingOnlineUser(roomId, { ...user, socketId: socket.id });
            socket.to(roomId).emit('other-joined', user);
            io.to(socket.id).emit('user-joined', response);
            console.log(rooms);
        });

        socket.on('leave-room', ({ roomId, user }: IJoinRoom) => {
            socket.leave(roomId);
            socket.to(roomId).emit('user-left', user);
            onRemoveOnlineUser(roomId, { ...user, socketId: socket.id });
            console.log(rooms);
        });

        socket.on('place-bid', ({ roomId, amount, user }: IPlaceBid) => {
            const room = rooms.get(roomId);
            if (!room) return;
            if (amount <= room.price) return;
            if (
                room.startTime.getTime() + room.duration * 60 * 1000 < new Date().getTime() ||
                room.startTime.getTime() > new Date().getTime()
            )
                return;
            rooms.set(roomId, { ...room, winner: user, price: amount });
            const response: IPlaceBidResponse = { price: amount, ...user, time: new Date() };
            io.to(roomId).emit('bid-success', response);
        });

        socket.on('new-comment', (data: INewComment) => {
            const response: ICommentItem = {
                content: data.message,
                time: new Date(),
                user: {
                    id: data.user.userId,
                    name: data.user.name,
                    avatar: data.avatar,
                },
            };
            io.to(data.roomId).emit('new-commented', response);
        });

        socket.on('winner-announce', async (roomId: string) => {
            const room = rooms.get(roomId);
            if (!room) return;
            if (room.winner) {
                const winnerResponse: IWinnerResponse = { price: room.price, ...room.winner, time: new Date() };
                const response = await updateWinnderBiddingSession(roomId, room.price, room.winner.userId);
                if (response) {
                    io.to(roomId).emit('winner-announced', winnerResponse);
                    onRemoveRoom(roomId);
                    io.to(roomId).socketsLeave(roomId);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
        });
    });
};
