import { Comment } from '../sequelizeModels/Comment';
import { CommentEmoji } from '../sequelizeModels/CommentEmoji';
import { Reply } from '../sequelizeModels/Reply';
import { Topic } from '../sequelizeModels/Topic';

export default function commentConfigure() {
    Comment.belongsTo(Topic);
    Comment.hasMany(Reply);
    Comment.hasMany(CommentEmoji);
}
