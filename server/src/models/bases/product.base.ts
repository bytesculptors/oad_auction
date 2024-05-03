import { ISchemaProduct } from '@interfaces/product.interface';
import { ProductSchema } from '@models/schemas/product.schema';
import { model } from 'mongoose';

export const ProductModel = model<ISchemaProduct>('Product', ProductSchema);
