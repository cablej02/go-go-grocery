import { Category } from '../models/index.js';

export const seedCategories = async () => {
  await Category.bulkCreate([
    { name: 'Fruit' },
    { name: 'Vegetable' },
    { name: 'Meat' },
    { name: 'Fish and Shellfish' },
    { name: 'Dairy' },
    { name: 'Bakery' },
    { name: 'Beverage' },
    { name: 'Snack' },
    { name: 'Frozen' },
    { name: 'Canned' },
    { name: 'Condiment' },
    { name: 'Spice' },
    { name: 'Hygiene' },
    { name: 'Household' },
    { name: 'Health Care' },
    { name: 'Baby Items' },
    { name: 'Pet Supplies' },
    { name: 'Other' },
  ])
}