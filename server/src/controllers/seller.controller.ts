import ProductStatus from '@constants/status';
import { Request, Response } from '@customes/auth.type';
import { ISchemaBiddingSession } from '@interfaces/bidding-session.interface';
import { IBiddingData, ICreateProduct, IQueryProduct, IUpdateProduct } from '@interfaces/product.interface';
import { BiddingSessionModel } from '@models/bases/bidding-session.base';
import { ProductModel } from '@models/bases/product.base';
import { UserModel } from '@models/bases/user.base';
import { biddingSelects } from '@references/selects/bidding.select';
import { isValidStatus } from '@utils/validate.util';
import { UpdateQuery } from 'mongoose';
import { BiddingRefOptions } from 'src/references/populate-opts/bidding.ref';
export default class SellerController {
    /**
     *
     * @param req
     * @param res
     * @returns product data
     */
    static createProduct = async (req: Request, res: Response) => {
        try {
            const { duration, startTime, sellerId, ...data } = <ICreateProduct>req.body;
            if (
                !data.description ||
                !duration ||
                !data.image ||
                !data.name ||
                !data.price ||
                !sellerId ||
                !data.deposit
            )
                return res.status(400).json({ message: 'All fields are required...' });
            const seller = await UserModel.findById(sellerId);
            if (!seller) return res.status(400).json({ message: 'Seller did not exist yet!' });
            const newProduct = await ProductModel.create({
                sellerId,
                ...data,
            });
            let newBiddingSession = new BiddingSessionModel({
                product: newProduct._id.toString(),
                duration: duration,
                sellerId: sellerId,
            });
            if (startTime) newBiddingSession.startTime = startTime;
            newBiddingSession = await newBiddingSession.save();
            const payload: IBiddingData = {
                _id: newBiddingSession._id.toString(),
                duration: newBiddingSession.duration,
                status: newBiddingSession.status,
                startTime: newBiddingSession.startTime,
                product: {
                    _id: newProduct._id.toString(),
                    ...data,
                },
            };
            res.status(201).json({ data: payload });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    static updateProduct = async (req: Request, res: Response) => {
        const { productId } = req.params;
        const { sellerId, duration, startTime, ...product } = <IUpdateProduct>req.body;
        if (!sellerId) return res.status(400).json({ message: 'SellerId is required!' });
        try {
            const newProduct = await ProductModel.findOneAndUpdate(
                { _id: productId, sellerId },
                { ...product },
                { upsert: true },
            );
            if (!newProduct) return res.status(400).json({ message: 'Product did not exist yet!' });
            const biddingUpdate: UpdateQuery<ISchemaBiddingSession> = {};
            if (duration) biddingUpdate.duration = duration;
            if (startTime) biddingUpdate.startTime = startTime;
            (duration || startTime) &&
                BiddingSessionModel.findOneAndUpdate({ product: productId, sellerId }, biddingUpdate).exec();
            res.status(200).json({ data: 'Update sucessfully !' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    static requestApprovaling = async (req: Request, res: Response) => {
        const { productId } = req.params;
        const { sellerId } = <{ sellerId: string }>req.body;
        if (!productId) return res.status(400).json({ message: 'ProductId is required!' });
        if (!sellerId) return res.status(400).json({ message: 'SellerId is required!' });
        try {
            const product = await ProductModel.findOne({ _id: productId, sellerId });
            if (!product) return res.status(400).json({ message: 'Product did not exist yet!' });
            const newBiddingSession = await BiddingSessionModel.findOneAndUpdate(
                { product: productId },
                { status: ProductStatus.PENDING },
                { upsert: true },
            );
            if (!newBiddingSession) return res.status(400).json({ message: 'Product did not exist yet!' });
            res.status(200).json({ data: 'Pending sucessfully !' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    static getProducts = async (req: Request, res: Response) => {
        const { status: stringStatus } = <IQueryProduct>(<unknown>req.query);
        const { sellerId } = <{ sellerId: string }>req.body;
        if (!sellerId) return res.status(400).json({ message: 'SellerId is required!' });
        const status = parseInt(stringStatus);
        if (!isNaN(status) && !isValidStatus(status)) return res.status(400).json({ message: 'status is invalid' });
        try {
            const biddingSessions = await BiddingSessionModel.find(
                !isNaN(status)
                    ? {
                          sellerId,
                          status: status,
                      }
                    : {
                          sellerId,
                      },
            )
                .select(biddingSelects)
                .populate(BiddingRefOptions({ sellerId }));
            res.status(200).json({ data: biddingSessions });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };
}
