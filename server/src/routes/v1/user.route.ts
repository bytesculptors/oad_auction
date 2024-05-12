import { UserController } from '@controllers/user.controller';
import { Router } from 'express';

const userRouter: Router = Router();

userRouter.post('/bidding-product', UserController.biddingProduct);
userRouter.delete('/cancel-product', UserController.cancelProduct);
userRouter.get('/find-product', UserController.findProducts);
userRouter.get('/find-product/:userId', UserController.findProductsByUser);

export default userRouter;
