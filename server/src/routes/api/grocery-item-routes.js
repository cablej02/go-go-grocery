import express from 'express';
import { GroceryItem } from '../../models/index.js';

const router = express.Router();

// GET /grocery-items/:id - Get a grocery item by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await GroceryItem.findByPk(id);
        if (item) {
            res.json(item)
        } else {
            res.status(404).json({message: 'Item not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// GET /grocery-items - Get all grocery items
router.get('/', async (req, res) => {
    try {
        const items = await GroceryItem.findAll();
        if (items){
            res.json(items)
        } else {
            res.status(404).json({message: 'Items not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

// POST /grocery-items - Create a new grocery item
router.post('/', async (req, res) => {
    const {id, name, CategoryId} = req.body
    try {
        const item = await GroceryItem.create({
            id, name, CategoryId
        });
        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

// PUT /grocery-items/:id - Update a grocery item by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, CategoryId } = req.body;
  try {
      const item = await GroceryItem.findByPk(id);
      if (item) {
          item.name = name;
          item.CategoryId = CategoryId;
          await item.save();
          res.json(item);
      } else {
          res.status(404).json({message: 'Item not found'});
      }
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

// PATCH /grocery-items/:id - Update a grocery item by id
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, CategoryId } = req.body;
    try {
        const item = await GroceryItem.findByPk(id);
        if (item) {
            if (name) item.name = name;
            if (CategoryId) item.CategoryId = CategoryId;
            await item.save();
            res.json(item);
        } else {
            res.status(404).json({message: 'Item not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE /grocery-items/:id - Delete a grocery item by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await GroceryItem.findByPk(id);
        if (item) {
            await item.destroy();
            res.json({message: 'Item deleted'});
        } else {
            res.status(404).json({message: 'Item not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export { router as groceryItemRouter }