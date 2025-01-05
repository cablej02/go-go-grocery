import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { CategoryFactory } from './category.js';
import { GroceryItemFactory } from './groceryItem.js';

const User = UserFactory(sequelize);
const Category = CategoryFactory(sequelize);
const GroceryItem = GroceryItemFactory(sequelize);

Category.hasMany(GroceryItem);

GroceryItem.belongsTo(Category)


export { sequelize, User, Category, GroceryItem };
