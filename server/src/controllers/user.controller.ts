import ProductStatus from '@constants/status';
import { Request, Response } from '@customes/auth.type';
import { IBiddingData, IBiddingProduct, IFindProduct, IProductPayload } from '@interfaces/product.interface';
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
            const payload: IBiddingData = {
                _id: biddingSession._id.toString(),
                duration: biddingSession.duration,
                status: biddingSession.status,
                startTime: biddingSession.startTime,
                product: {
                    _id: product._id.toString(),
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    description: product.description,
                    deposit: product.deposit,
                },
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
            const test = await ProductModel.aggregate([
                {
                    $match: {
                        $text: {
                            $search: keyword,
                            // $language:
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'biddingsessions',
                        localField: '_id',
                        foreignField: 'product',
                        as: 'bidding',
                        pipeline: [
                            {
                                $project: {
                                    status: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $project: {},
                },
            ]).exec();
            return res.status(200).json({ data: test });

            //     .select('name image price description deposit')
            //     .populate({
            //         path: '_id',
            //         model: 'BiddingSession',
            //         select: 'startTime status duration',
            //         match: { sellerId },
            //     });
            // const products = await ProductModel.find({ name: { $regex: new RegExp(keyword, 'i') } });
            const biddingSessions = await BiddingSessionModel.find()
                .select('startTime status duration')
                .populate({
                    path: 'product',
                    model: 'Product',
                    select: 'name image price description deposit',
                    match: { $text: { $search: keyword } },
                    options: {},
                });
            if (!biddingSessions) return res.status(200).json({ data: [] });
            res.status(200).json({ data: biddingSessions });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    };
}
