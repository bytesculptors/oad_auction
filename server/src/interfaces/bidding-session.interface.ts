import { Document, ObjectId } from 'mongoose';

export interface IBiddingSessionSchema extends Document {
    product: ObjectId;
    bidders: ObjectId[];
    sellerId: ObjectId;
    startTime: Date;
    winnerId: ObjectId;
    status: number;
    duration: number;
}
