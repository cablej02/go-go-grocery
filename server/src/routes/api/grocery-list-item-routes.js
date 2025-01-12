import express from 'express';
import { GroceryListItem } from '../../models/index.js';
import { Product } from '../../models/index.js';
import { Category } from '../../models/index.js';

const router = express.Router();

//GET /api/list-items?list_id=1 - Get all grocery list items for a specific list and the products associated with them
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
                include: {
                    model: Category,
                },
            },
        });

        res.json(groceryListItems.map((item) => {
            return {
                id: item.id,
                product_id: item.product_id,
                quantity: item.quantity,
                name: item.Product.name,
                category_id: item.Product.category_id,
                categoryName: item.Product.Category.name,
            };
        }));
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
        // insert the new grocery list item
        const createResult = await GroceryListItem.create(
            {
                list_id,
                product_id,
                quantity,
            },
        );

        // get the new item with the product and category
        const groceryListItem = await GroceryListItem.findByPk(createResult.id, 
            {
                include: {
                    model: Product,
                    attributes: ['name', 'category_id'],
                    include: {
                        model: Category,
                        attributes: ['name'],
                    },
                }
            }
        );

        res.status(201).json({
            id: groceryListItem.id,
            list_id: groceryListItem.list_id,
            product_id: groceryListItem.product_id,
            quantity: groceryListItem.quantity,
            name: groceryListItem.Product.name,
            category_id: groceryListItem.Product.category_id,
            categoryName: groceryListItem.Product.Category.name,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//PUT - Update a grocery list item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { list_id, product_id, quantity } = req.body;

    if (!list_id || !product_id || !quantity || isNaN(Number(list_id)) || isNaN(Number(product_id)) || isNaN(Number(quantity))) {
        return res.status(400).json({ message: 'List_id, product_id, and quantity are required and must be numeric.' });
    }

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
    const { list_id, product_id, quantity } = req.body;

    if (list_id) {
        if (isNaN(Number(list_id))) {
            return res.status(400).json({ message: 'List_id must be numeric.' });
        }
    }

    if (product_id) {
        if (isNaN(Number(product_id))) {
            return res.status(400).json({ message: 'Product_id must be numeric.' });
        }
    }

    if (quantity) {
        if (isNaN(Number(quantity))) {
            return res.status(400).json({ message: 'Quantity must be numeric.' });
        }
    }
    try {
        //console.log(id, typeof id, list_id, typeof list_id, product_id, typeof product_id, quantity, typeof quantity);
         const groceryListItem = await GroceryListItem.findByPk(id);
         if (groceryListItem) {
            if (list_id) groceryListItem.list_id = list_id;
            if (product_id) groceryListItem.product_id = product_id;
            if (quantity) groceryListItem.quantity = quantity;
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