import { configureStore } from '@reduxjs/toolkit';
import stateUserSlice from './stateUser/user.state';

export const store = configureStore({
    reducer: {
        reducerUser: stateUserSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
