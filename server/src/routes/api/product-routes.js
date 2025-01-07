import express from 'express';
import { Product } from '../../models/index.js';

const router = express.Router();

// GET /products/:id - Get a product by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Product.findByPk(id);
        if (item) {
            res.json(item)
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// GET /products - Get all products
router.get('/', async (req, res) => {
    try {
        const items = await Product.findAll();
        if (items){
            res.json(items)
        } else {
            res.status(404).json({message: 'Products not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

// POST /products - Create a new product
router.post('/', async (req, res) => {
    const {id, name, category_id} = req.body
    try {
        const item = await Product.create({
            id, name, category_id
        });
        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

// PUT /products/:id - Update a product by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;
  try {
      const item = await Product.findByPk(id);
      if (item) {
          item.name = name;
          item.category_id = category_id;
          await item.save();
          res.json(item);
      } else {
          res.status(404).json({message: 'Product not found'});
      }
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

// PATCH /products/:id - Update a product by id
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category_id } = req.body;
    try {
        const item = await Product.findByPk(id);
        if (item) {
            if (name) item.name = name;
            if (category_id) item.category_id = category_id;
            await item.save();
            res.json(item);
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE /products/:id - Delete a product by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Product.findByPk(id);
        if (item) {
            await item.destroy();
            res.json({message: 'Product deleted'});
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export { router as productRouter }