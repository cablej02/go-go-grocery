import { Router } from 'express';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/api', authenticateToken, apiRoutes);

export default router;
