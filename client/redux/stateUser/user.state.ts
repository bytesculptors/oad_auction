import { IUser } from '@/types/use.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState extends IUser {}

const initialState: UserState = {
    _id: '',
    email: '',
    name: '',
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

        setBalanceUser: (user, action: PayloadAction<number>) => {
            user.balance = action.payload;
            return user;
        },
    },
});

export const { setStateUser, setBalanceUser } = stateUserSlice.actions;

export default stateUserSlice;
