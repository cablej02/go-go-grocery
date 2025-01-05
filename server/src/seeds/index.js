import sequelize from '../config/connection.js';
import { seedCategories } from './category-seeds.js';

const seedAll = async () => {
  try{
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    //TODO: await grocery-item
    //TODO: await grocery-list

    process.exit(0);
  }
  catch(err){
    console.error(err);
    process.exit(1);
  }
}

seedAll();