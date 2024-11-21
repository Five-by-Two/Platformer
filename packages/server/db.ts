import commentConfigure from './sequelizeConfigurations/commentConfigure';
import reactionConfigure from './sequelizeConfigurations/reactionConfigure';
import replyConfigure from './sequelizeConfigurations/replyConfigure';
import topicConfigure from './sequelizeConfigurations/topicConfigure';
import { SequelizeService } from './services/SequelizeService';
export const configureDatabase = async () => {
    try {
        await SequelizeService.authenticate();
        console.log('Connection success!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    try {
        topicConfigure();
        commentConfigure();
        replyConfigure();
        reactionConfigure();
        await SequelizeService.sync();
    } catch (error) {
        console.error('Error configure tables', error);
    }
};
