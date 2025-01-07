import { DataTypes, Model, } from 'sequelize';

export class Product extends Model{};

export function ProductFactory(sequelize) {
    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            tableName: 'products',
            sequelize,
            timestamps: true,
        }
    )
    return Product;
};