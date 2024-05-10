import SellerController from '@controllers/seller.controller';
import { Router } from 'express';

const sellerRouter = Router();

sellerRouter.post('/create-product', SellerController.createProduct);
sellerRouter.patch('/update-product/:productId', SellerController.updateProduct);
sellerRouter.post('/request-review/:productId', SellerController.requestApprovaling);
sellerRouter.get('/get-products/:sellerId', SellerController.getProducts);
export default sellerRouter;
