import { DataTypes, Model } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export class reaction extends Model {}
reaction.init(
    {
        emojiCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 12],
                    msg: 'Min length - 3 max length - 12',
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
