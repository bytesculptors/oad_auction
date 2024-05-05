import { Request, Response } from '@customes/auth.type';
import { IAdminAcceptProduct, IQueryProduct } from '@interfaces/product.interface';
import { BiddingSessionModel } from '@models/bases/bidding-session.base';
import { BiddingRefOptions } from '@references/populate-opts/bidding.ref';
import { biddingSelects } from '@references/selects/bidding.select';
import { isValidAdminAccept, isValidStatus } from '@utils/validate.util';

export default class AdminController {
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

    static reviewProduct = async (req: Request, res: Response) => {
        const { status: stringStatus } = <IQueryProduct>(<unknown>req.query);
        const { _id, productId, sellerId } = <IAdminAcceptProduct>req.body;
        if (!_id || !productId || !sellerId)
            return res.status(400).json({ message: '_id, sellerId, productId is required !' });
        if (!stringStatus) return res.status(400).json({ message: 'status is invalid' });
        const status = parseInt(stringStatus);
        if (status && !isValidAdminAccept(status)) return res.status(400).json({ message: 'status is invalid' });

        try {
            const biddingSessions = await BiddingSessionModel.findOneAndUpdate(
                {
                    _id,
                    product: productId,
                    sellerId,
                },
                {
                    status,
                },
                { upsert: true },
            );
            if (!biddingSessions) return res.status(400).json({ message: 'status is invalid' });
            res.status(200).json({ message: 'Request done!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };
}
