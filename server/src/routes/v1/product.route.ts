import { ProductController } from '@controllers/product.controller';
import { Router } from 'express';

const productRouter: Router = Router();

productRouter.post('/create', ProductController.create);

export default productRouter;
