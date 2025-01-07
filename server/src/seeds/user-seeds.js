import { User } from '../models/index.js';
const users = [
    { email: 'test@test.com', password: 'password' },
    { email: 'test2@test.com', password: 'password' },
]
export const seedUsers = async () => {
    for(let user of users) {
        const tempUser = User.build(user);
        await tempUser.setPassword(user.password);
        user.password = tempUser.password;
    }
    await User.bulkCreate(users);
}