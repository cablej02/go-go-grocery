import express from 'express';
import { Product } from '../../models/index.js';

const router = express.Router();

// GET /products/:id - Get a product by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            res.json(product)
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
        const products = await Product.findAll();
        if (products){
            res.json(products)
        } else {
            res.status(404).json({message: 'Products not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

// POST /products - Create a new product
router.post('/', async (req, res) => {
    const {name, category_id} = req.body
    try {
        const product = await Product.create({
            name, category_id
        });
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

// PUT /products/:id - Update a product by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  // validate the request and confirm category_id is a number
  if (!name || !category_id || isNaN(Number(category_id))) {
      return res.status(400).json({message: 'Name and category_id are required'});
  }

  try {
      const product = await Product.findByPk(id);
      if (product) {
          product.name = name;
          product.category_id = category_id;
          await product.save();
          res.json(product);
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
        const product = await Product.findByPk(id);
        if (product) {
            if (name) product.name = name;
            if (category_id) product.category_id = category_id;
            await product.save();
            res.json(product);
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
        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
            res.json({message: 'Product deleted'});
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export { router as productRouter }