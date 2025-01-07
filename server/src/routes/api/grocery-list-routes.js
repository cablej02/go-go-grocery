import express from 'express';
import { GroceryList } from '../../models/index.js'

const router = express.Router();

//GET /lists for a specific user using query params
router.get('/', async (req, res) => {
    const { owner_id } = req.query;

    if (!owner_id || isNaN(Number(owner_id))) {
        return res.status(400).json({ message: 'A valid numeric owner_id query parameter is required.' });
    }

    try {
        const lists = await GroceryList.findAll({ where: { owner_id }})
        if (lists.length > 0) {
            res.json(lists)
        } else {
            res.status(404).json({message: 'Lists not found'});
        }
    } catch (error) {
            res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const groceryList = await GroceryList.findByPk(id);
        if (groceryList) {
            res.json(groceryList)
        } else {
            res.status(404).json({message: 'Grocery List not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/', async (req, res) => {
    const { id, name, owner_id } = req.body
    try {
        const groceryList = await GroceryList.create({
            id, name, owner_id
        });
        res.status(201).json(groceryList)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, owner_id } = req.body;
    try {
        const groceryList = await GroceryList.findByPk(id);
        if (groceryList) {
            groceryList.name = name;
            groceryList.owner_id = owner_id;
            await groceryList.save();
            res.json(groceryList);
        } else {
            res.status(404).json({message: 'Grocery List not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const groceryList = await GroceryList.findByPk(id);
        if (groceryList) {
            await groceryList.destroy();
            res.json({message: 'Grocery List deleted'});
        } else {
            res.status(404).json({message: 'Grocery List not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export { router as groceryListRouter }