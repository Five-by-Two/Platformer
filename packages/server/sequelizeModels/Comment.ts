import { DataTypes, Model } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export class Comment extends Model {}

Comment.init(
    {
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 500],
                    msg: 'Error validate, min lenght 10, max lenght 500',
                },
            },
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize: SequelizeService },
);
