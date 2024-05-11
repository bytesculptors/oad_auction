import { SearchProduct } from '@constants/search';
import ProductStatus from '@constants/status';
import { Request, Response } from '@customes/auth.type';
import { IBiddingData, IBiddingProduct, IFindProduct, IProductPayload } from '@interfaces/product.interface';
import { BiddingSessionModel } from '@models/bases/bidding-session.base';
import { ProductModel } from '@models/bases/product.base';
import { UserModel } from '@models/bases/user.base';
import { BiddingRefOptions } from '@references/populate-opts/bidding.ref';
import { biddingSelects } from '@references/selects/bidding.select';
import mongoose from 'mongoose';
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
                { product: productId },
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
                    category: product.category,
                    color: product.color,
                    condition: product.condition,
                    dimension: product.dimension,
                    manufacturer: product.manufacturer,
                    material: product.material,
                    origin: product.origin,
                    style: product.style,
                    weight: product.weight,
                    year: product.year,
                },
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
     * @returns status Is product canceled
     */
    static cancelProduct = async (req: Request, res: Response) => {
        try {
            const { productId, userId } = <IBiddingProduct>req.body;
            if (!productId || !userId) return res.status(400).json({ message: 'Properties are not correct!' });
            const biddingSession = await BiddingSessionModel.findOne({ productId });
            if (!biddingSession) return res.status(400).json({ message: 'Bidding session did not exist yet!' });
            BiddingSessionModel.findOneAndUpdate(
                { productId },
                { $pull: { bidders: new mongoose.Types.ObjectId(userId) } },
                { upsert: true },
            ).exec();
            res.status(201).json({ data: 'Delete successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    /**
     *
     * @param req
     * @param res
     * @returns products by keyword
     */
    static findProducts = async (req: Request, res: Response) => {
        const { keyword, limit = SearchProduct.LIMIT, page = SearchProduct.PAGE } = <IFindProduct>(<unknown>req.query);
        try {
            const products = await ProductModel.find(keyword ? { $text: { $search: keyword } } : {})
                .limit(limit)
                .skip(page)
                .exec();

            const productIds = products.map((item) => {
                return item._id;
            });

            const biddingSessions = await BiddingSessionModel.find({
                product: { $in: productIds },
                status: ProductStatus.ACTIVE,
            })
                .select(biddingSelects)
                .populate(BiddingRefOptions());
            if (!biddingSessions) return res.status(200).json({ data: [] });
            res.status(200).json({ data: biddingSessions });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    };
}
