import { ISocketState } from '@/types/socket.type';
import { createSlice } from '@reduxjs/toolkit';
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
    },
});

export const SocketActions = SocketSlice.actions;
export const SocketReducer = SocketSlice.reducer;
