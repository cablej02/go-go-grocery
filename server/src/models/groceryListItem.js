import { DataTypes, Model } from "sequelize";

export class GroceryListItem extends Model {};

export function GroceryListItemFactory(sequelize) {
    GroceryListItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            list_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'grocery_list_items',
            sequelize,
            timestamps: true,
            indexes: [
                {
                    // combined unique index to force unique pairs of list_id and product_id
                    // also improves query performance on list_id
                    unique: true,
                    fields: ['list_id', 'product_id'],
                }
            ]
        }
    );
    return GroceryListItem;
}