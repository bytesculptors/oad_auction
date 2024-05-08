import { configureStore } from '@reduxjs/toolkit';
import stateUserSlice from './stateUser/user.state';
import { SocketReducer } from './socket-client/socket.slice';
export const store = configureStore({
    reducer: {
        reducerUser: stateUserSlice.reducer,
        reducerSocket: SocketReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
