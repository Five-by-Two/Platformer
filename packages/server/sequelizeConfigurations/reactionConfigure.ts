import { Reaction } from '../sequelizeModels/Reaction';
import { Topic } from '../sequelizeModels/Topic';

export default function reactionConfigure() {
    Reaction.belongsTo(Topic);
}
