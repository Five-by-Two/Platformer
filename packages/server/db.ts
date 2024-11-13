import { SequelizeService } from './services/SequelizeService';

export const createClientAndConnect = async () => {
    try {
        await SequelizeService.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
