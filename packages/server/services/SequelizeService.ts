import 'dotenv/config';
import { Sequelize } from 'sequelize';

export const SequelizeService = new Sequelize(
    process.env.POSTGRES_DB!,
    process.env.POSTGRES_USER!,
    process.env.POSTGRES_PASSWORD!,
    {
        host: process.env.POSTGRES_HOST!,
        port: Number(process.env.POSTGRES_PORT!),
        dialect: 'postgres',
    },
);
