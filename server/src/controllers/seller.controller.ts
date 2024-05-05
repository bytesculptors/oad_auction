import ProductStatus from '@constants/status';
import { Request, Response } from '@customes/auth.type';
import {
    IBiddingData,
    ICreateProduct,
    IProductPayload,
    IQueryProduct,
    IUpdateProduct,
} from '@interfaces/product.interface';
import { BiddingSessionModel } from '@models/bases/bidding-session.base';
import { ProductModel } from '@models/bases/product.base';
import { UserModel } from '@models/bases/user.base';
import { biddingSelects } from '@references/selects/bidding.select';
import { isValidStatus } from '@utils/validate.util';
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
            const product = <ICreateProduct>req.body;
            if (
                !product.description ||
                !product.duration ||
                !product.image ||
                !product.name ||
                !product.price ||
                !product.sellerId ||
                !product.deposit
            )
                return res.status(400).json({ message: 'All fields are required...' });
            const seller = await UserModel.findById(product.sellerId);
            if (!seller) return res.status(400).json({ message: 'Seller did not exist yet!' });
            const newProduct = await ProductModel.create({
                sellerId: product.sellerId,
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                deposit: product.deposit,
            });
            let newBiddingSession = new BiddingSessionModel({
                product: newProduct._id.toString(),
                duration: product.duration,
                sellerId: product.sellerId,
            });
            if (product?.time_start) newBiddingSession.startTime = product.time_start;
            newBiddingSession = await newBiddingSession.save();
            const payload: IBiddingData = {
                _id: newBiddingSession._id.toString(),
                duration: newBiddingSession.duration,
                status: newBiddingSession.status,
                startTime: newBiddingSession.startTime,
                product: {
                    _id: newProduct._id.toString(),
                    name: newProduct.name,
                    image: newProduct.image,
                    price: newProduct.price,
                    description: newProduct.description,
                    deposit: newProduct.deposit,
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
        const { sellerId, ...product } = <IUpdateProduct>req.body;
        if (!sellerId) return res.status(400).json({ message: 'SellerId is required!' });
        try {
            const newProduct = await ProductModel.findOneAndUpdate(
                { _id: productId, sellerId },
                { ...product },
                { upsert: true },
            );
            if (!newProduct) return res.status(400).json({ message: 'Product did not exist yet!' });
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
                { productId },
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
