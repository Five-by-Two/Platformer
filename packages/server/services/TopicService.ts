import { Topic } from '../sequelizeModels/Topic';

class TopicService {
    public async getAllAsync(): Promise<Array<Topic>> {
        return Topic.findAll()
            .then(result => {
                return result as Array<Topic>;
            })
            .catch(error => {
                throw error;
            });
    }
}

export default new TopicService();
