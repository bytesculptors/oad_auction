import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import paymentRouter from './payment.route';
import sellerRouter from './seller.route';
import adminRouter from './admin.route';
const v1Router: Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/user', userRouter);
v1Router.use('/payment', paymentRouter);
v1Router.use('/seller', sellerRouter);
v1Router.use('/admin', adminRouter);
export default v1Router;
