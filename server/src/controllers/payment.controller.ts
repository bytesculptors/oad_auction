import { Request, Response } from '@customes/auth.type';
import { ICreateOrderPayload, ICreatePaymentOrder } from '@interfaces/payment.interface';
import { formatDate } from '@utils/date.util';
import envConfig from '@configs/env.config';
import crypto from 'crypto';
import dateFormat from 'dateformat';
export default class PaymentController {
    static createOrder(req: Request, res: Response) {
        const { amount, bankCode, language, orderDescription, orderType } = <ICreateOrderPayload>req.body;
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

        res.status(200).json({
            data: {
                url: vnpUrl,
                createDate: createDate,
                expiredDate: vnpExpiredDate,
            },
            message: 'Success',
        });
    }
}
