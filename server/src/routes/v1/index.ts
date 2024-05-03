import { Router } from 'express';
import authRouter from './auth.route';
import productRouter from './product.route';
import paymentRouter from './payment.route';
const v1Router: Router = Router();
v1Router.use('/auth', authRouter);
v1Router.use('/product', productRouter);
v1Router.use('/payment', paymentRouter);

export default v1Router;
