import { IUser } from '@/types/use.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState extends IUser {}

const initialState: UserState = {
    _id: '1',
    email: '',
    name: 'andrew',
    role: '',
    balance: 0,
};

const stateUserSlice = createSlice({
    name: 'user_state',
    initialState,
    reducers: {
        setStateUser: (user, action: PayloadAction<UserState>) => {
            user = action.payload;
            console.log('action', user);
            return user;
        },
    },
});

export const { setStateUser } = stateUserSlice.actions;

export default stateUserSlice;
