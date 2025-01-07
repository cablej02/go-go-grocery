import sequelize from '../config/connection.js';
import { seedCategories } from './category-seeds.js';
import { seedProducts } from './product-seeds.js';
import { seedUsers } from './user-seeds.js';
import { seedGroceryLists } from './grocery-list-seeds.js';
import { seedGroceryListItems } from './grocery-list-item-seeds.js';
import { seedSharedLists } from './shared-list-seeds.js';

const seedAll = async () => {
  try{
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedProducts();
    console.log('\n----- PRODUCTS SEEDED -----\n');

    await seedGroceryLists();
    console.log('\n----- GROCERY LIST SEEDED -----\n');

    await seedGroceryListItems();
    console.log('\n----- GROCERY LIST ITEMS SEEDED -----\n');

    await seedSharedLists();
    console.log('\n----- SHARED LISTS SEEDED -----\n');

    process.exit(0);
  }
  catch(err){
    console.error(err);
    process.exit(1);
  }
}

seedAll();