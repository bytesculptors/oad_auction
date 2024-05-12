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
    vnp_SecureHash: string;
}

export interface IPaymentResultResponse {
    _id: string;
    status: string;
    bankTransId: string;
    transId: string;
    cartType: string;
    createdAt: string;
    order: {
        _id: string;
        amount: number;
        infor: string;
        bankCode: string;
    };
}

export interface IPaymentResultResponseRaw {
    data: IPaymentResultResponse;
}

export enum PaymentStatus {
    SUCCESS = '00',
}
