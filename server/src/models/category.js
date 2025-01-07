import { DataTypes, Model } from 'sequelize';

export class Category extends Model {
  // Do nothing
}

export function CategoryFactory(sequelize){
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
        tableName: 'categories',
        sequelize,
        timestamps: true,
    }
  )
  return Category;
}