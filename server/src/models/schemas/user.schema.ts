import { Document, Schema } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    auctions: string[];
}

export const UserSchema: Schema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true, unique: true },
        auctions: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);
