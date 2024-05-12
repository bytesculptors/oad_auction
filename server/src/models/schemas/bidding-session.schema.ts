import ProductStatus from '@constants/status';
import { IBiddingSessionSchema } from '@interfaces/bidding-session.interface';
import { defaultStartDate } from '@utils/date.util';
import { Types, Schema } from 'mongoose';

export const BiddingSessionSchema = new Schema<IBiddingSessionSchema>(
    {
        product: {
            type: Types.ObjectId,
            required: true,
        },
        sellerId: {
            type: Types.ObjectId,
            required: true,
        },
        bidders: {
            type: [Types.ObjectId],
            required: true,
            default: [],
        },
        startTime: {
            type: Date,
            required: true,
            default: defaultStartDate(),
        },
        winnerId: {
            type: Types.ObjectId,
            required: false,
        },
        status: {
            type: Number,
            required: true,
            default: ProductStatus.INACTIVE,
        },
        duration: {
            type: Number,
            required: true,
            default: 60,
        },
    },
    {
        timestamps: true,
    },
);
