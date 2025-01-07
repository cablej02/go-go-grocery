import express from 'express';
import { GroceryListItem } from '../../models/index.js';
import { Product } from '../../models/index.js';

const router = express.Router();

//GET - Get all grocery list items for a specific list and the products associated with them
router.get('/', async (req, res) => {
    const { list_id } = req.query;

    if (!list_id || isNaN(Number(list_id))) {
        return res.status(400).json({ message: 'A valid numeric list_id query parameter is required.' });
    }

    try {
        const groceryListItems = await GroceryListItem.findAll({
            where: { list_id },
            include: {
                model: Product,
            },
        });

        res.json(groceryListItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//GET - Get a specific grocery list item by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const groceryListItem = await GroceryListItem.findByPk(id, {
            include: {
                model: Product,
                as: 'product',
            },
        });

        if (groceryListItem) {
            res.json(groceryListItem);
        } else {
            res.status(404).json({ message: 'Grocery List Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//POST - Create a new grocery list item
router.post('/', async (req, res) => {
    const { list_id, product_id, quantity } = req.body;

    try {
        const groceryListItem = await GroceryListItem.create({
            list_id,
            product_id,
            quantity,
        });

        res.status(201).json(groceryListItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//PUT - Update a grocery list item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { list_id, product_id, quantity } = req.body;

    try {
        const groceryListItem = await GroceryListItem.findByPk(id);
        if (groceryListItem) {
            groceryListItem.list_id = list_id;
            groceryListItem.product_id = product_id;
            groceryListItem.quantity = quantity;
            await groceryListItem.save();
            res.json(groceryListItem);
        } else {
            res.status(404).json({ message: 'Grocery List Item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//PATCH - Update the quantity of a grocery list item
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const groceryListItem = await GroceryListItem.findByPk(id);
        if (groceryListItem) {
            groceryListItem.quantity = quantity;
            await groceryListItem.save();
            res.json(groceryListItem);
        } else {
            res.status(404).json({ message: 'Grocery List Item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//DELETE - Delete a grocery list item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const groceryListItem = await GroceryListItem.findByPk(id);
        if (groceryListItem) {
            await groceryListItem.destroy();
            res.json({ message: 'Grocery List Item deleted' });
        } else {
            res.status(404).json({ message: 'Grocery List Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as groceryListItemRouter };