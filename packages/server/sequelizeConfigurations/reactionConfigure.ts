import { comment } from '../sequelizeModels/comment';
import { reaction } from '../sequelizeModels/reaction';

export default function reactionConfigure() {
    reaction.belongsTo(comment);
}
