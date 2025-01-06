import express from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

// GET /users/:id - Get a user by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get /users/:email - Get a user by email
router.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] }
        });
    if (user) {
        res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /users/:id - Update a user by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /users/:id - Update a user by id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.email = email || user.email;
      user.password = password || user.password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };
