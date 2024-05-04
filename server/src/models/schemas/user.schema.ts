import Role from '@constants/role';
import { ISchemaUser } from '@interfaces/auth.interface';
import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema<ISchemaUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true, unique: true },
        balance: { type: Number, required: true, default: 0 },
        role: { type: String, required: true, default: Role.USER },
    },
    {
        timestamps: true,
    },
);
