import { SequelizeService } from './services/SequelizeService';

export const checkDatabaseConnection = async () => {
    try {
        await SequelizeService.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
