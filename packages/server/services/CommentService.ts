import { CreateCommentDto } from '../dtos/CreateCommentDto';
import { UpdateCommentDto } from '../dtos/UpdateCommentDto';
import { Comment } from '../sequelizeModels/Comment';
import { Reply } from '../sequelizeModels/Reply';
import { Topic } from '../sequelizeModels/Topic';
class CommentService {
    public async getByTopicId(topicId: number): Promise<Array<Comment>> {
        return Comment.findAll({
            where: {
                TopicId: topicId,
            },
            include: Reply,
        })
            .then(result => result as Array<Comment>)
            .catch(error => {
                throw new Error(`Error get all comments: ${error}`);
            });
    }

    public async getByIdAsync(id: number): Promise<Comment | null> {
        return Comment.findByPk(id, { include: Reply })
            .then(result => result as Topic)
            .catch(error => {
                throw new Error(`Error get comment by id: ${error}`);
            });
    }

    public async createAsync(model: CreateCommentDto): Promise<Comment> {
        await Topic.findByPk(model.TopicId).then(topic => {
            if (topic === null) throw new Error('Topic not found');
        });
        return Comment.create(model)
            .then(result => result as Comment)
            .catch(error => {
                throw new Error(`Error create comment: ${error}`);
            });
    }
    public async updateAsync(model: UpdateCommentDto) {
        return Comment.update(
            { message: model.message },
            {
                where: {
                    id: model.commentId,
                },
            },
        ).catch(error => {
            console.error(error);
        });
    }

    public async deleteAsync(id: number) {
        return Comment.destroy({
            where: { id: id },
        }).catch(error => {
            console.error(error);
        });
    }
}

export default new CommentService();
