import { model } from 'mongoose';
import { UserSchema } from '../schemas/user.schema';
import { ISchemaUser } from '@interfaces/auth.interface';

export const UserModel = model<ISchemaUser>('User', UserSchema);
