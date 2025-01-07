import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { productRouter } from './product-routes.js';
import { groceryListRouter } from './grocery-list-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/lists', groceryListRouter);

export default router;
