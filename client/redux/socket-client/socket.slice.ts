import {
    IBidSuccessCallBack,
    ICommentCallBack,
    IJoinRoom,
    INewComment,
    IPlaceBid,
    ISocketState,
    IUserJoinedCallBack,
    IWinnerAnnouncedCallBack,
} from '@/types/socket.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { off } from 'process';
import { Socket, io } from 'socket.io-client';
const baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
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
        onWinnerAnnounce: (state, action: PayloadAction<string>) => {
            state.socket.emit('winner-announce', action.payload);
        },
        onWinnerAnnounced: (state, action: PayloadAction<IWinnerAnnouncedCallBack>) => {
            state.socket.on('winner-announced', action.payload);
        },
        offWinnerAnnounced: (state) => {
            state.socket.off('winner-announced');
        },
        onNewComment: (state, action: PayloadAction<INewComment>) => {
            state.socket.emit('new-comment', action.payload);
        },
        onNewCommentReceived: (state, action: PayloadAction<ICommentCallBack>) => {
            state.socket.on('new-commented', action.payload);
        },
        offNewCommentReceived: (state) => {
            state.socket.off('new-commented');
        },
    },
});

export const SocketActions = SocketSlice.actions;
export const SocketReducer = SocketSlice.reducer;
