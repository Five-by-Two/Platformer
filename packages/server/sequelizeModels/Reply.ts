import { DataTypes } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export const Reply = SequelizeService.define('Reply', {
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
