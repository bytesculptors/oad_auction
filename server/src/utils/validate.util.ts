import ProductStatus, { AdminAcceptStatus } from '@constants/status';

export const isValidStatus = (status: number): boolean => {
    return status in ProductStatus;
};

export const isValidAdminAccept = (status: number): boolean => {
    return status in AdminAcceptStatus;
};
