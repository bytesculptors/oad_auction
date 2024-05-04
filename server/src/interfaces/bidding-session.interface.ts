import { Document, ObjectId } from 'mongoose';

export interface ISchemaBiddingSession extends Document {
    productId: ObjectId;
    bidders: ObjectId[];
    startTime: Date;
    winnerId: ObjectId;
    status: number;
    duration: number;
}
