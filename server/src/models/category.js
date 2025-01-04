import { DataTypes, Model } from 'sequelize';

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