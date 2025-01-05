import express from 'express';
import { GroceryItem } from '../../models/index.js';

const router = express.Router();

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
})

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
})

// TODO: PUT, DELETE Routes

export { router as groceryItemRouter }