import sequelize from '../config/connection.js';
import { seedCategories } from './category-seeds.js';
import { seedGroceryItems } from './grocery-item-seeds.js';
import { seedUsers } from './user-seeds.js';

const seedAll = async () => {
  try{
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedGroceryItems();
    console.log('\n----- GROCERY ITEMS SEEDED -----\n');

    //TODO: await grocery-list

    process.exit(0);
  }
  catch(err){
    console.error(err);
    process.exit(1);
  }
}

seedAll();