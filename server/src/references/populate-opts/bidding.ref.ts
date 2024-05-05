import { productSelects } from '@references/selects/product.select';
import { PopulateOptions, PopulateOption } from 'mongoose';

export const BiddingRefOptions = (match: any): PopulateOptions => {
    const populatedOptions: PopulateOptions = {
        path: 'product',
        model: 'Product',
        select: productSelects,
        match: match,
    };
    return populatedOptions;
};
