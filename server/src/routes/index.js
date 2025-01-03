import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import apiRoutes from './api/index.js';
import { authRouter } from './auth-routes.js';

const router = Router();

router.use('/api', authenticateToken, apiRoutes);
router.use('auth', authRouter);

export default router;
