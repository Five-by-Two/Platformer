import { CreateReactionDto } from '../dtos/CreateReactionDto';
import { Comment } from '../sequelizeModels/Comment';
import { Reaction } from '../sequelizeModels/Reaction';
import { Reply } from '../sequelizeModels/Reply';
class ReactionService {
    public async getByCommentId(commentId: number): Promise<Array<Reaction>> {
        return Reaction.findAll({
            where: {
                CommentId: commentId,
            },
        })
            .then(result => result as Array<Reaction>)
            .catch(error => {
                throw new Error(`Error get all reactions: ${error}`);
            });
    }
    public async getByIdAsync(id: number): Promise<Reaction | null> {
        return Reaction.findByPk(id)
            .then(result => result as Reaction)
            .catch(error => {
                throw new Error(`Error get reaction by id: ${error}`);
            });
    }
    public async createAsync(model: CreateReactionDto): Promise<Reply> {
        await Comment.findByPk(model.CommentId).then(comment => {
            if (comment === null) throw new Error('comment not found');
        });
        return Reaction.create(model)
            .then(result => result as Reaction)
            .catch(error => {
                throw new Error(`Error create reaction: ${error}`);
            });
    }

    public async deleteAsync(id: number) {
        return Reaction.destroy({
            where: { id: id },
        }).catch(error => {
            console.error(error);
        });
    }
}

export default new ReactionService();
