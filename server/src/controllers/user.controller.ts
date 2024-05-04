import ProductStatus from '@constants/status';
import { Request, Response } from '@customes/auth.type';
import { IBiddingProduct, IFindProduct, IProductPayload } from '@interfaces/product.interface';
import { BiddingSessionModel } from '@models/bases/bidding-session.base';
import { ProductModel } from '@models/bases/product.base';
import { UserModel } from '@models/bases/user.base';
import { Schema, Types } from 'mongoose';
export class UserController {
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
            const user = await UserModel.findById(userId);
            if (!user) return res.status(400).json({ message: 'User did not exist yet!' });
            const product = await ProductModel.findById(productId);
            if (!product) return res.status(400).json({ message: 'Product did not exist yet!' });
            const biddingSession = await BiddingSessionModel.findOneAndUpdate(
                { productId: productId },
                { $push: { bidders: userId } },
                { upsert: true },
            );
            if (!biddingSession) return res.status(400).json({ message: 'Bidding session did not exist yet!' });
            const payload: IProductPayload = {
                _id: productId,
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                biddingSessionId: biddingSession._id.toString(),
                status: biddingSession.status,
                deposit: product.deposit,
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
            const biddingSession = await BiddingSessionModel.findOne({ productId });
            if (!biddingSession) return res.status(400).json({ message: 'Bidding session did not exist yet!' });
            BiddingSessionModel.findOneAndUpdate(
                { productId },
                { $pull: { bidders: new Types.ObjectId(userId) } },
                { upsert: true },
            ).exec();
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
            const data: IProductPayload[] = await Promise.all(
                products.map(async (product) => {
                    const biddingSession = await BiddingSessionModel.findOne({
                        productId: product._id.toString(),
                    });
                    return {
                        _id: product._id.toString(),
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        description: product.description,
                        status: biddingSession?.status || ProductStatus.INACTIVE,
                        biddingSessionId: biddingSession?._id.toString(),
                        deposit: product.deposit,
                    };
                }),
            );
            res.status(200).json({ data: data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    };
}
