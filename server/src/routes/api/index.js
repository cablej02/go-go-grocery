import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.js'; // TODO: Actually use this
import { userRouter } from './user-routes.js';
import { authRouter } from './auth-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
