import { orderSelects } from '@references/selects/order.select';
import { productSelects } from '@references/selects/product.select';
import { userSlects } from '@references/selects/user.select';
import { PopulateOptions, PopulateOption } from 'mongoose';

export const BiddingRefOptions = (match?: any): PopulateOptions => {
    const populatedOptions: PopulateOptions = {
        path: 'product',
        model: 'Product',
        select: productSelects,
    };
    if (match) populatedOptions.match = match;
    return populatedOptions;
};

export const UserRefOptions = (path: string): PopulateOptions => {
    const populatedOptions: PopulateOptions = {
        path: path,
        model: 'User',
        select: userSlects,
    };
    return populatedOptions;
};

export const PaymentRefOptios = (): PopulateOptions => {
    const populatedOptions: PopulateOptions = {
        path: 'order',
        model: 'Order',
        select: orderSelects,
    };
    return populatedOptions;
};
