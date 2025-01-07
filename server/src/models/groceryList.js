import { DataTypes, Model } from "sequelize";

export class GroceryList extends Model {

}

export function GroceryListFactory(sequelize){
    GroceryList.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: 'grocery_lists',
            sequelize,
            timestamps: true,
        }
    )
    return GroceryList;
}