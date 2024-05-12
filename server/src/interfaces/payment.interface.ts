import { Document, ObjectId } from 'mongoose';

export interface IOrderSchema extends Document {
    user: ObjectId;
    amount: number;
    command: string;
    bankCode: string;
    currCode: string;
    infor: string;
    type: string;
    txnRef: string;
    returnUrl: string;
    createDate: string;
    expireDate: string;
}

export interface IPaymentSchema extends Document {
    user: ObjectId;
    order: ObjectId;
    status: string;
    bankTransId: string;
    transId: string;
    cartType: string;
    payDate: string;
}

export interface ICreateOrderPayload {
    amount: number;
    bankCode?: string;
    orderDescription: string;
    orderType: string;
    language: string;
}

export interface ICreatePaymentOrder {
    vnp_Version: string;
    vnp_Command: string;
    vnp_TmnCode: string;
    vnp_Amount: number;
    vnp_BankCode?: string;
    vnp_CreateDate: string;
    vnp_CurrCode: string;
    vnp_IpAddr: string;
    vnp_Locale: string;
    vnp_OrderInfo: string;
    vnp_OrderType: string;
    vnp_ReturnUrl: string;
    vnp_ExpireDate: string;
    vnp_TxnRef: string;
    vnp_SecureHash?: string;
}

export interface IParamsPaymentResult {
    vnp_Amount: string;
    vnp_BankCode: string;
    vnp_BankTranNo: string;
    vnp_CardType: string;
    vnp_OrderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: string;
    vnp_TransactionStatus: string;
    vnp_TxnRef: string;
    vnp_SecureHash?: string;
}
