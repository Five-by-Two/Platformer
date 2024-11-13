import { DataTypes } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export const Comment = SequelizeService.define('Comment', {
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    authorId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    createDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});
