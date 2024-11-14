import { DataTypes, Model } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export class reply extends Model {}
reply.init(
    {
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize: SequelizeService },
);
