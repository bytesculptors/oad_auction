import { IBidSuccessCallBack, IJoinRoom, IPlaceBid, ISocketState, IUserJoinedCallBack } from '@/types/socket.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { off } from 'process';
import { Socket, io } from 'socket.io-client';
const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const socket: Socket = io(baseUrl, {
    autoConnect: false,
});

const initialSocketState: ISocketState = {
    socket: socket,
    isConnected: false,
};

export const SocketSlice = createSlice({
    name: 'socket',
    initialState: initialSocketState as ISocketState,
    reducers: {
        connectSocket: (state) => {
            state.isConnected = true;
            state.socket.connect();
        },

        disconnectSocket: (state) => {
            state.isConnected = false;
            state.socket.disconnect();
        },

        onJoinRoom: (state, action: PayloadAction<IJoinRoom>) => {
            state.socket.emit('join-room', action.payload);
        },

        onLeaveRoom: (state, action: PayloadAction<IJoinRoom>) => {
            state.socket.emit('leave-room', action.payload);
        },

        onUserJoined: (state, action: PayloadAction<IUserJoinedCallBack>) => {
            state.socket.on('user-joined', action.payload);
        },
        offUserJoined: (state) => {
            state.socket.off('user-joined');
        },
        onPlaceBid: (state, action: PayloadAction<IPlaceBid>) => {
            state.socket.emit('place-bid', action.payload);
        },
        onBidSuccess: (state, action: PayloadAction<IBidSuccessCallBack>) => {
            state.socket.on('bid-success', action.payload);
        },
        offBidSuccess: (state) => {
            state.socket.off('bid-success');
        },
    },
});

export const SocketActions = SocketSlice.actions;
export const SocketReducer = SocketSlice.reducer;
