import { CreateTopicDto } from '../dtos/createTopicDto';
import { comment } from '../sequelizeModels/comment';
import { topic } from '../sequelizeModels/topic';
class TopicService {
    public async getAllAsync(): Promise<Array<topic>> {
        return topic
            .findAll()
            .then(result => result as Array<topic>)
            .catch(error => {
                throw new Error(`Error get all topics: ${error}`);
            });
    }

    public async getByIdAsync(id: number): Promise<topic | null> {
        return topic
            .findByPk(id, { include: comment })
            .then(result => result as topic)
            .catch(error => {
                throw new Error(`Error get topic by id: ${error}`);
            });
    }

    public async createAsync(model: CreateTopicDto): Promise<topic> {
        return topic
            .create({
                title: model.title,
                description: model.description,
                authorId: model.authorId,
            })
            .then(result => result as topic)
            .catch(error => {
                throw new Error(`Error create topic: ${error}`);
            });
    }
}

export default new TopicService();
