import React, { FC } from 'react';

interface IAuthProps {
    children: React.ReactNode;
}

const AuthLayout: FC<IAuthProps> = ({ children }) => {
    return children;
};

export default AuthLayout;
