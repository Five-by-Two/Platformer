import { CreateReplyDto } from '../dtos/CreateReplyDto';
import { UpdateReplyDto } from '../dtos/UpdateReplyDto';
import { Comment } from '../sequelizeModels/Comment';
import { Reply } from '../sequelizeModels/Reply';
class ReplyService {
    public async getByCommentId(commentId: number): Promise<Array<Reply>> {
        return Reply.findAll({
            where: {
                CommentId: commentId,
            },
        })
            .then(result => result as Array<Reply>)
            .catch(error => {
                throw new Error(`Error get all replies: ${error}`);
            });
    }
    public async getByReplyId(replyId: number): Promise<Array<Reply>> {
        return Reply.findAll({
            where: {
                ReplyId: replyId,
            },
        })
            .then(result => result as Array<Reply>)
            .catch(error => {
                throw new Error(`Error get all replies: ${error}`);
            });
    }
    public async getByIdAsync(id: number): Promise<Reply | null> {
        return Reply.findByPk(id)
            .then(result => result as Reply)
            .catch(error => {
                throw new Error(`Error get reply by id: ${error}`);
            });
    }

    public async createAsync(model: CreateReplyDto): Promise<Reply> {
        if (model.CommentId && model.ReplyId) {
            throw new Error('The reply can have only CommentId or only ReplyId');
        }
        if (!model.CommentId && !model.ReplyId) {
            throw new Error('The reply must have CommentId or ReplyId');
        }
        if (model.CommentId) {
            await Comment.findByPk(model.CommentId).then(comment => {
                if (comment === null) throw new Error('comment not found');
            });
        }
        if (model.ReplyId) {
            await Reply.findByPk(model.ReplyId).then(reply => {
                if (reply === null) throw new Error('reply not found');
            });
        }
        return Reply.create(model)
            .then(result => result as Reply)
            .catch(error => {
                throw new Error(`Error create reply: ${error}`);
            });
    }
    public async updateAsync(model: UpdateReplyDto) {
        return Reply.update(
            { message: model.message },
            {
                where: {
                    id: model.replyId,
                },
            },
        ).catch(error => {
            console.error(error);
        });
    }

    public async deleteAsync(id: number) {
        return Reply.destroy({
            where: { id: id },
        }).catch(error => {
            console.error(error);
        });
    }
}

export default new ReplyService();
