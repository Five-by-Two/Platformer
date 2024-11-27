import { DataTypes, Model } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export class Reaction extends Model {
    emojiCode?: string;
}

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
        authorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        TopicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Topics',
                key: 'id',
            },
        },
    },
    { sequelize: SequelizeService },
);
