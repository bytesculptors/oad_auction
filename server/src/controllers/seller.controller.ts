import { Request, Response } from '@customes/auth.type';
import { ICreateProduct, IProductPayload } from '@interfaces/product.interface';
import { ProductModel } from '@models/bases/product.base';

export default class SellerController {
    static create = async (req: Request, res: Response) => {
        try {
            const product = <ICreateProduct>req.body;
            if (!product.description || !product.duration || !product.image || !product.name || !product.price)
                return res.status(400).json({ message: 'All fields are required...' });
            const newProduct = await ProductModel.create({ ...product });
            const payload: IProductPayload = {
                _id: newProduct._id.toString(),
                name: newProduct.name,
                image: newProduct.image,
                price: newProduct.price,
                description: newProduct.description,
            };
            res.status(201).json({ data: payload });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };
}
