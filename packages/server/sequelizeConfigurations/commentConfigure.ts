import { Comment } from '../sequelizeModels/Comment';
import { Reply } from '../sequelizeModels/Reply';
import { Topic } from '../sequelizeModels/Topic';

export default function commentConfigure() {
    Comment.belongsTo(Topic);
    Comment.hasMany(Reply);
}
