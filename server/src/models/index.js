import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { CategoryFactory } from './category.js';
import { GroceryItemFactory } from './groceryItem.js';

const User = UserFactory(sequelize);
const Category = CategoryFactory(sequelize);
const GroceryItem = GroceryItemFactory(sequelize);
//const GroceryList = GroceryListFactory(sequelize); //TODO: Uncomment this line when you create the GroceryList model

Category.hasMany(GroceryItem);

GroceryItem.belongsTo(Category);

// TODO: Uncomment these lines when you create the GroceryList model
// User.hasMany(GroceryList, {
//     onDelete: 'CASCADE',
// });

// TODO: Uncomment these lines when you create the GroceryList model
// GroceryList.belongsTo(User);

export { sequelize, User, Category, GroceryItem };
