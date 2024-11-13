import { DataTypes, Model } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export class Reaction extends Model {}
Reaction.init(
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
        authorId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    { sequelize: SequelizeService },
);
