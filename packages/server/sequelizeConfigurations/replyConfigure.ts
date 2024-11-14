import { comment } from '../sequelizeModels/comment';
import { reply } from '../sequelizeModels/reply';

export default function replyConfigure() {
    reply.belongsTo(comment);
    reply.hasOne(reply);
    reply.belongsTo(reply);
}
