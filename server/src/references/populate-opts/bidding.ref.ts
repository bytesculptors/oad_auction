import { productSelects } from '@references/selects/product.select';
import { userSlects } from '@references/selects/user.select';
import { PopulateOptions, PopulateOption } from 'mongoose';

export const BiddingRefOptions = (match?: any, isPopulated: boolean = false): PopulateOptions => {
    const populatedOptions: PopulateOptions = {
        path: 'product',
        model: 'Product',
        select: productSelects,
    };
    if (match) populatedOptions.match = match;
    return populatedOptions;
};

export const UserRefOptions = (): PopulateOptions => {
    const populatedOptions: PopulateOptions = {
        path: 'sellerId',
        model: 'User',
        select: userSlects,
    };
    return populatedOptions;
};
