import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { groceryItemRouter } from './grocery-item-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/items', groceryItemRouter)

export default router;
