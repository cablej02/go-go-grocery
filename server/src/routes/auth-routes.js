import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database by email
  const user = await User.findOne({
    where: { email },
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ id: user.id, email }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({ email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

// POST /register - Register a new user
router.post('/register', register);

export { router as authRouter };
