import express from 'express';
import { SharedList } from '../../models/index.js';
import { GroceryList } from '../../models/index.js';
import { User } from '../../models/index.js';

const router = express.Router();

// GET /shared-lists - Get all shared lists for a specific user
router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const sharedLists = await SharedList.findAll({
            where: { user_id },
            include: {
                model: GroceryList,
                as: 'list',
            },
        });

        if (sharedLists.length > 0) {
            // return the list_id, name, shared list id
            res.json(sharedLists.map((sharedList) => {
                return {
                    id: sharedList.id,
                    list_id: sharedList.list.id,
                    name: sharedList.list.name,
                };
            }));
        } else {
            res.status(404).json({ message: 'Shared lists not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /shared-lists - Share a list with another user using user email and list_id
router.post('/', async (req, res) => {
    const { email, list_id } = req.body;

    try {
        // Get the user if it exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the list exists
        const list = await GroceryList.findByPk(list_id);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        const sharedList = await SharedList.create({
            user_id: user.id,
            list_id,
        });
        res.status(201).json(sharedList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /shared-lists:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user.id; // get the user id from the request object, added by the authenticateToken middleware

    try {
        const sharedList = await SharedList.findByPk(id);
        if(!sharedList) {
            return res.status(404).json({ message: 'Shared list not found' });
        }

        // Check if the user is the owner of the shared list
        if (sharedList.user_id !== user_id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Delete the shared list
        await sharedList.destroy();
        res.json(sharedList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as sharedListRouter };