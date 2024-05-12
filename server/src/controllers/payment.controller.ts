import { Request, Response } from '@customes/auth.type';
import { ICreateOrderPayload, ICreatePaymentOrder, IParamsPaymentResult } from '@interfaces/payment.interface';
import { formatDate } from '@utils/date.util';
import envConfig from '@configs/env.config';
import crypto from 'crypto';
import dateFormat from 'dateformat';
import { OrderModel } from '@models/bases/order.base';
import { UserModel } from '@models/bases/user.base';
import { PaymentModel } from '@models/bases/payment.base';
import { paymentSelects } from '@references/selects/payment-result.select copy';
import { PaymentRefOptios, UserRefOptions } from '@references/populate-opts/bidding.ref';

export default class PaymentController {
    static createOrder = async (req: Request, res: Response) => {
        const { userId } = <{ userId: string }>req.params;
        if (!userId) return res.status(400).json({ message: 'User id is required...' });
        try {
            const user = await UserModel.findById(userId);
            if (!user) return res.status(400).json({ message: 'User did not exist yet!' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong !' });
        }

        const { amount, bankCode, language, orderDescription, orderType } = <ICreateOrderPayload>req.body;
        if (!amount || !orderDescription || !orderType)
            return res.status(400).json({ message: 'All fields are required...' });

        const ipAddr =
            (req.headers['x-forwarded-for'] as string) ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            '';
        // const ipAddr = '222.252.107.112';
        const tmnCode = envConfig.VNP_TMN_CODE;
        const secretKey = envConfig.VNP_HASH_SECRET;
        const baseUrl = envConfig.VNP_PAY_URL;
        const returnUrl = envConfig.VNP_RETURN_URL;

        const date = new Date();
        const createDate = formatDate(date);
        const expiredDate = new Date(date.getTime() + 15 * 60 * 1000);
        const vnpExpiredDate = formatDate(expiredDate);
        const orderId = dateFormat(date, 'HHmmss');
        let locale = language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        const currCode = 'VND';
        let vnp_Params: ICreatePaymentOrder = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Amount: amount * 100,
            vnp_CreateDate: createDate,
            vnp_CurrCode: currCode,
            vnp_IpAddr: ipAddr,
            vnp_Locale: locale,
            vnp_OrderInfo: orderDescription,
            vnp_OrderType: orderType,
            vnp_ReturnUrl: returnUrl,
            vnp_TxnRef: orderId,
            vnp_ExpireDate: vnpExpiredDate,
        };
        if (bankCode !== null && bankCode !== '') {
            vnp_Params.vnp_BankCode = bankCode;
        }

        const redirectUrl = new URL(baseUrl);

        Object.entries(vnp_Params)
            .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
            .forEach(([key, value]) => {
                // Skip empty value
                if (value === '' || value === undefined || value === null) {
                    return;
                }

                redirectUrl.searchParams.append(key, value.toString());
            });

        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(redirectUrl.search.slice(1).toString(), 'utf-8')).digest('hex');
        vnp_Params.vnp_SecureHash = signed;
        redirectUrl.searchParams.append('vnp_SecureHash', signed);
        const vnpUrl: string = redirectUrl.toString();

        try {
            const newOrder = await OrderModel.create({
                user: userId,
                amount: amount,
                command: vnp_Params.vnp_Command,
                currCode: currCode,
                infor: orderDescription,
                type: orderType,
                txnRef: orderId,
                returnUrl: returnUrl,
                createDate: createDate,
                expireDate: vnpExpiredDate,
            });
            res.status(200).json({
                data: {
                    url: vnpUrl,
                    createDate: createDate,
                    expiredDate: vnpExpiredDate,
                },
                message: 'Success',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong !' });
        }
    };

    static validatePaymentResult = async (req: Request, res: Response) => {
        const { userId } = <{ userId: string }>req.params;
        if (!userId) return res.status(400).json({ message: 'User id is required...' });
        const data = <IParamsPaymentResult>(<unknown>req.query);
        const secretKey = envConfig.VNP_HASH_SECRET;
        const baseUrl = envConfig.VNP_PAY_URL;
        const redirectUrl = new URL(baseUrl);
        const vnp_Params = { ...data };
        try {
            const user = await UserModel.findById(userId);
            if (!user) return res.status(400).json({ message: 'User did not exist yet!' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong !' });
        }
        // Remove hash params
        if (vnp_Params.hasOwnProperty('vnp_SecureHash')) {
            delete vnp_Params.vnp_SecureHash;
        }
        // Sort params
        Object.entries(vnp_Params)
            .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
            .forEach(([key, value]) => {
                if (value === '' || value === undefined || value === null) {
                    return;
                }
                redirectUrl.searchParams.append(key, value.toString());
            });
        // Validate signature
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(redirectUrl.search.slice(1).toString(), 'utf-8')).digest('hex');

        if (signed !== data.vnp_SecureHash) {
            return res.status(400).json({ message: 'Invalid signature' });
        }
        // Save payment result
        try {
            const order = await OrderModel.findOne({ user: userId, txnRef: data.vnp_TxnRef });
            if (!order) return res.status(400).json({ message: 'Order did not exist yet!' });
            const newPayment = await PaymentModel.create({
                user: userId,
                order: order._id,
                status: data.vnp_ResponseCode,
                bankTransId: data.vnp_BankTranNo,
                transId: data.vnp_TransactionNo,
                cartType: data.vnp_CardType,
                payDate: data.vnp_PayDate,
            });

            const user = await UserModel.findByIdAndUpdate(userId, { $inc: { balance: order.amount } });

            const paymentData = await PaymentModel.findById(newPayment._id)
                .select(paymentSelects)
                .populate(PaymentRefOptios());
            return res.status(200).json({ data: paymentData });
        } catch (error) {}
        return res.status(200).json({ message: 'Success' });
    };
}
