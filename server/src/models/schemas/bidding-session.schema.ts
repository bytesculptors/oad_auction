import ProductStatus from '@constants/status';
import { ISchemaBiddingSession } from '@interfaces/bidding-session.interface';
import { defaultStartDate } from '@utils/date.util';
import { Schema } from 'mongoose';

export const BiddingSessionSchema = new Schema<ISchemaBiddingSession>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        userIds: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        startTime: {
            type: Date,
            required: true,
            default: defaultStartDate(),
        },
        winnerId: {
            type: Schema.Types.ObjectId,
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
