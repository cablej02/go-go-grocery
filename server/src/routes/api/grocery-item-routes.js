import express from express;
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

export { router as groceryItemRouter }