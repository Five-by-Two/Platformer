import commentConfigure from './sequelizeConfigurations/commentConfigure';
import replyConfigure from './sequelizeConfigurations/replyConfigure';
import topicConfigure from './sequelizeConfigurations/topicConfigure';
import { SequelizeService } from './services/SequelizeService';
export const checkDatabaseConnection = async () => {
    try {
        await SequelizeService.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    try {
        topicConfigure();
        commentConfigure();
        replyConfigure();
        await SequelizeService.sync();
    } catch (error) {
        console.error('Error configure tables', error);
    }
};
