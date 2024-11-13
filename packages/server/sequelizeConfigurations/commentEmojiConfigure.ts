import { Comment } from '../sequelizeModels/Comment';
import { CommentEmoji } from '../sequelizeModels/CommentEmoji';

export default function commentEmojiConfigure() {
    CommentEmoji.belongsTo(Comment);
}
