import { Document, ObjectId } from 'mongoose';

export interface ISchemaBiddingSession extends Document {
    product: ObjectId;
    bidders: ObjectId[];
    startTime: Date;
    winnerId: ObjectId;
    status: number;
    duration: number;
}
