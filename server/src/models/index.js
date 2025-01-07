import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { CategoryFactory } from './category.js';
import { ProductFactory } from './product.js';
import { GroceryListFactory } from './groceryList.js'

const User = UserFactory(sequelize);
const Category = CategoryFactory(sequelize);
const Product = ProductFactory(sequelize);
const GroceryList = GroceryListFactory(sequelize);

Category.hasMany(Product, {
    foreignKey: 'category_id',
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

User.hasMany(GroceryList, {
    onDelete: 'CASCADE',
    foreignKey: 'owner_id',
});

GroceryList.belongsTo(User, {
    foreignKey: 'owner_id',
});

export { sequelize, User, Category, Product, GroceryList };
