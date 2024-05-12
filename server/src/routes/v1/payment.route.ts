import PaymentController from '@controllers/payment.controller';
import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.post('/create-order/:userId', PaymentController.createOrder);
paymentRouter.post('/payment-result/:userId', PaymentController.validatePaymentResult);
paymentRouter.post('/pay-product/:userId', PaymentController.payProduct);
export default paymentRouter;
