import { DataTypes, Model } from 'sequelize';

export class SharedList extends Model {

}

export function SharedListFactory(sequelize) {
    SharedList.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            list_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'shared_lists',
            sequelize,
            timestamps: true,
            indexes: [ // composite unique index to force unique pairs of user_id and list_id
                {
                    unique: true,
                    fields: ['user_id', 'list_id'],
                }
            ]
        }
    );
    return SharedList;
}