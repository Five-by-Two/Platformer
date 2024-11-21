import { DataTypes, Model } from 'sequelize';
import { SequelizeService } from '../services/SequelizeService';

export class Reply extends Model {}
Reply.init(
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
