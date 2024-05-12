import request from '@/lib/axios';
import { IParamsPaymentResult, IPaymentResultResponse } from '@/types/payment.type';

export const validatePaymentResult = (userId: string, params: IParamsPaymentResult) => {
    return request.post<IPaymentResultResponse>(`/v1/payment/payment-result/${userId}`, undefined, {
        params,
    });
};
