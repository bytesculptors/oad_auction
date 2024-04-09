import { IProduct, ProductSchema } from '@models/schemas/product.schema';
import { model } from 'mongoose';

export const ProductModel = model<IProduct>('Product', ProductSchema);
