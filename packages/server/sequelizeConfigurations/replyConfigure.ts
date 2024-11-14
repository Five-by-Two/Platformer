import { Comment } from '../sequelizeModels/Comment';
import { Reply } from '../sequelizeModels/Reply';

export default function replyConfigure() {
    Reply.belongsTo(Comment);
    Reply.hasOne(Reply);
    Reply.belongsTo(Reply);
}
