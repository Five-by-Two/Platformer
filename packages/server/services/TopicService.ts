import { Topic } from '../sequelizeModels/Topic';

class TopicService {
    async getAllAsync(): Promise<Array<Topic>> {
        return Topic.findAll().then(result => {
            return result as Array<Topic>;
        });
    }
}

export default new TopicService();
