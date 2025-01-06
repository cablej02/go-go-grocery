import { DataTypes, Model, } from 'sequelize';

export class GroceryItem extends Model{



};

export function GroceryItemFactory(sequelize) {

    GroceryItem.init(
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
            tableName: 'grocery_items',
            sequelize,
            timestamps: true,
        }
    )
    return GroceryItem;
};