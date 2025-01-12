import express from 'express';
import { Category } from '../../models/index.js';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export { router as categoryRouter };