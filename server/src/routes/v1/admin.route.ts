import AdminController from '@controllers/admin.controller';
import { Router } from 'express';

const adminRouter = Router();

adminRouter.get('/get-products', AdminController.getProducts);
adminRouter.post('/review-product', AdminController.reviewProduct);

export default adminRouter;
