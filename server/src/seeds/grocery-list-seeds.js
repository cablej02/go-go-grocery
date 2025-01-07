import { GroceryList } from '../models/index.js';

export const seedGroceryLists = async () => {
  await GroceryList.bulkCreate([
    { name: 'Grocery List 1', owner_id: 1 },
    { name: 'Grocery List 2', owner_id: 1 },
  ]);
};