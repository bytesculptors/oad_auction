import { ProductController } from '@controllers/product.controller';
import { Router } from 'express';

const productRouter: Router = Router();

productRouter.post('/create', ProductController.create);
productRouter.post('/bidding-product', ProductController.biddingProduct);
productRouter.post('/cancel-product', ProductController.cancelProduct);
productRouter.get('/find-product', ProductController.findProducts);

export default productRouter;
