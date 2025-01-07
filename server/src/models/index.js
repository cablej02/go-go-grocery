import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { CategoryFactory } from './category.js';
import { ProductFactory } from './product.js';

const User = UserFactory(sequelize);
const Category = CategoryFactory(sequelize);
const Product = ProductFactory(sequelize);
//const GroceryList = GroceryListFactory(sequelize); //TODO: Uncomment this line when you create the GroceryList model

Category.hasMany(Product, {
    foreignKey: 'category_id',
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

// TODO: Uncomment these lines when you create the GroceryList model
// User.hasMany(GroceryList, {
//     onDelete: 'CASCADE',
//     foreignKey: 'user_id',
// });

// TODO: Uncomment these lines when you create the GroceryList model
// GroceryList.belongsTo(User, {
//     foreignKey: 'user_id',
// });

export { sequelize, User, Category, Product };
