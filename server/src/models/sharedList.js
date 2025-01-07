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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            listId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'shared_lists',
            sequelize,
            timestamps: true,
            indexes: [ // composite unique index to force unique pairs of userId and listId
                {
                    unique: true,
                    fields: ['userId', 'listId'],
                }
            ]
        }
    );
    return SharedList;
}