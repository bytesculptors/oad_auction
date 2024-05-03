import PaymentController from '@controllers/payment.controller';
import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.get('/create-order', PaymentController.createOrder);
export default paymentRouter;
