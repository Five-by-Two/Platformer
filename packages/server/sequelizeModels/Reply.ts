import { DataTypes, Model } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export class Reply extends Model {}
Reply.init(
    {
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    { sequelize: SequelizeService },
);
