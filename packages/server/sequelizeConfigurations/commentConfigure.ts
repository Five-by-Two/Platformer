import { comment } from '../sequelizeModels/comment';
import { reaction } from '../sequelizeModels/reaction';
import { reply } from '../sequelizeModels/reply';
import { topic } from '../sequelizeModels/topic';

export default function commentConfigure() {
    comment.belongsTo(topic);
    comment.hasMany(reply);
    comment.hasMany(reaction);
}
