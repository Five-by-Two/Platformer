import { CreateCommentDto } from '../dtos/CreateCommentDto';
import { comment } from '../sequelizeModels/comment';
import { reply } from '../sequelizeModels/reply';
import { topic } from '../sequelizeModels/topic';
class CommentService {
    public async getByTopicId(topicId: number): Promise<Array<comment>> {
        return comment
            .findAll({
                where: {
                    topicId: topicId,
                },
                include: reply,
            })
            .then(result => result as Array<comment>)
            .catch(error => {
                throw new Error(`Error get all comments: ${error}`);
            });
    }

    public async getByIdAsync(id: number): Promise<comment | null> {
        return comment
            .findByPk(id, { include: reply })
            .then(result => result as topic)
            .catch(error => {
                throw new Error(`Error get comment by id: ${error}`);
            });
    }

    public async createAsync(model: CreateCommentDto): Promise<comment> {
        await topic.findByPk(model.topicId).then(topic => {
            if (topic === null) throw new Error('Topic not found');
        });
        return comment
            .create(model)
            .then(result => result as comment)
            .catch(error => {
                throw new Error(`Error create comment: ${error}`);
            });
    }
}

export default new CommentService();
