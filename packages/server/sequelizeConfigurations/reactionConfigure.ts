import { Comment } from '../sequelizeModels/Comment';
import { Reaction } from '../sequelizeModels/Reaction';

export default function reactionConfigure() {
    Reaction.belongsTo(Comment);
}
