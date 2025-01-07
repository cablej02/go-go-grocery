import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { CategoryFactory } from './category.js';
import { ProductFactory } from './product.js';
import { GroceryListFactory } from './groceryList.js'
import { SharedListFactory } from './sharedList.js';

const User = UserFactory(sequelize);
const Category = CategoryFactory(sequelize);
const Product = ProductFactory(sequelize);
const GroceryList = GroceryListFactory(sequelize);
const SharedList = SharedListFactory(sequelize);

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

GroceryList.hasMany(SharedList, {
    foreignKey: 'list_id',
    onDelete: 'CASCADE',
});
SharedList.belongsTo(GroceryList, {
    foreignKey: 'list_id',
});

User.hasMany(SharedList, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
SharedList.belongsTo(User, {
    foreignKey: 'user_id',
});

export { sequelize, User, Category, Product, GroceryList, SharedList };
