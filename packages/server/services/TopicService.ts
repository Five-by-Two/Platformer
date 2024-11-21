import { UpdateTopicDto } from '../dtos/UpdateTopicDto';
import { CreateTopicDto } from '../dtos/createTopicDto';
import { Comment } from '../sequelizeModels/Comment';
import { Topic } from '../sequelizeModels/Topic';
class TopicService {
    public async getAllAsync(): Promise<Array<Topic>> {
        return Topic.findAll()
            .then(result => result as Array<Topic>)
            .catch(error => {
                throw new Error(`Error get all topics: ${error}`);
            });
    }

    public async getByIdAsync(id: number): Promise<Topic | null> {
        return Topic.findByPk(id, { include: Comment })
            .then(result => result as Topic)
            .catch(error => {
                throw new Error(`Error get topic by id: ${error}`);
            });
    }

    public async createAsync(model: CreateTopicDto): Promise<Topic> {
        return Topic.create(model)
            .then(result => result as Topic)
            .catch(error => {
                throw new Error(`Error create topic: ${error}`);
            });
    }

    public async updateAsync(model: UpdateTopicDto) {
        return Topic.update(
            { title: model.title, description: model.description },
            {
                where: {
                    id: model.topicId,
                },
            },
        ).catch(error => {
            console.error(error);
        });
    }

    public async deleteAsync(id: number) {
        return Topic.destroy({
            where: { id: id },
        }).catch(error => {
            console.error(error);
        });
    }
}

export default new TopicService();
