import { IBiddingSessionSchema } from '@interfaces/bidding-session.interface';
import { BiddingSessionSchema } from '@models/schemas/bidding-session.schema';
import { model } from 'mongoose';

export const BiddingSessionModel = model<IBiddingSessionSchema>('BiddingSession', BiddingSessionSchema);
