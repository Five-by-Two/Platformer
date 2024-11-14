import { comment } from '../sequelizeModels/comment';
import { topic } from '../sequelizeModels/topic';

export default function topicConfigure() {
    topic.hasMany(comment);
}
