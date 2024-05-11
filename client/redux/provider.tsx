'use client';
import { Provider } from 'react-redux';
import { store } from './Store';
import { useEffect } from 'react';
import { setStateUser } from './stateUser/user.state';

const Providers = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            store.dispatch(setStateUser(user));
        }
    }, []);
    return <Provider store={store}>{children}</Provider>;
};
export default Providers;
