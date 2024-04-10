import { Request, Response } from '@customes/auth.type';
import { IBiddingProduct, ICreateProduct, IFindProduct, IProductPayload } from '@interfaces/product.interface';
import { ProductModel } from '@models/bases/product.base';
import { UserModel } from '@models/bases/user.base';

export class ProductController {
    /**
     *
     * @param req
     * @param res
     * @returns product data
     */
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
                duration: newProduct.duration,
                time_start: newProduct.time_start,
            };
            res.status(201).json({ data: payload });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    /**
     *
     * @param req
     * @param res
     * @returns product data
     */

    static biddingProduct = async (req: Request, res: Response) => {
        try {
            const { productId, userId } = <IBiddingProduct>req.body;
            if (!productId || !userId) return res.status(400).json({ message: 'Properties are not correct!' });
            const product = await ProductModel.findById(productId);
            if (!product) return res.status(400).json({ message: 'Product did not exist yet!' });
            const user = await UserModel.findOneAndUpdate({ _id: userId }, { $push: { auctions: productId } });
            const payload: IProductPayload = {
                _id: product._id.toString(),
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                duration: product.duration,
                time_start: product.time_start,
            };
            res.status(201).json({ data: payload });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    static cancelProduct = async (req: Request, res: Response) => {
        try {
            const { productId, userId } = <IBiddingProduct>req.body;
            if (!productId || !userId) return res.status(400).json({ message: 'Properties are not correct!' });
            const product = await ProductModel.findById(productId);
            if (!product) return res.status(400).json({ message: 'Product did not exist yet!' });
            const user = await UserModel.findOneAndUpdate({ _id: userId }, { $pull: { auctions: productId } });
            res.status(201).json({ data: 'Delete successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    static findProducts = async (req: Request, res: Response) => {
        const { keyword } = <IFindProduct>(<unknown>req.query);
        try {
            const products = await ProductModel.find({ $text: { $search: keyword } });
            // const products = await ProductModel.find({ name: { $regex: new RegExp(keyword, 'i') } });
            if (!products) return res.status(200).json({ data: [] });
            const data: IProductPayload[] = products.map((product) => ({
                _id: product._id.toString(),
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                duration: product.duration,
                time_start: product.time_start,
            }));
            res.status(200).json({ data: data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    };
}
