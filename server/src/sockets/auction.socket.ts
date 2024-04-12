import { IBiddingRoom, IJoinRoom, IOnlineUser } from '@interfaces/socket.interface';
import { ProductModel } from '@models/bases/product.base';
import { Server } from 'socket.io';

const rooms: Map<string, IBiddingRoom> = new Map();

const userExistIndex = (room: IBiddingRoom, user: IOnlineUser): number => {
    const index = room.users.findIndex((u) => u.userId === user.userId);
    return index;
};

const onAddingOnlineUser = async (roomId: string, user: IOnlineUser): Promise<void> => {
    if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        if (room && userExistIndex(room, user) < 0) {
            rooms.set(roomId, { ...room, users: [...room.users, user] });
        }
    } else {
        try {
            const product = await ProductModel.findById(roomId);
            rooms.set(roomId, { price: product?.price || 0, users: [user] });
        } catch (error) {
            console.log(error);
            rooms.set(roomId, { price: 0, users: [user] });
        }
    }
};

const onRemoveOnlineUser = (roomId: string, user: IOnlineUser): void => {
    if (!rooms.has(roomId)) return;
    const room = rooms.get(roomId);
    if (!room) return;
    if (userExistIndex(room, user) < 0) return;
    room.users.splice(userExistIndex(room, user), 1);
    rooms.set(roomId, { ...room, users: room.users });
};

export const socketConfig = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('User connected: ', socket.id);

        socket.on('join-room', async ({ roomId, user }: IJoinRoom) => {
            socket.join(roomId);
            socket.to(roomId).emit('user-joined', user);
            await onAddingOnlineUser(roomId, { ...user, socketId: socket.id });
            console.log(rooms);
        });

        socket.on('leave-room', ({ roomId, user }: IJoinRoom) => {
            socket.leave(roomId);
            socket.to(roomId).emit('user-left', user);
            onRemoveOnlineUser(roomId, { ...user, socketId: socket.id });
            console.log(rooms);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
        });
    });
};
