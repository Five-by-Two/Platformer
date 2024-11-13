import { DataTypes } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export const CommentEmoji = SequelizeService.define('CommentEmoji', {
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
});
