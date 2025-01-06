import { User } from '../models/index.js';

export const seedUsers = async () => {
    await User.bulkCreate([
        { email: 'test@test.com', password: 'password' },
    ])
}