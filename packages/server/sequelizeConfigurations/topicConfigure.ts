import { Comment } from '../sequelizeModels/Comment';
import { Topic } from '../sequelizeModels/Topic';

export default function topicConfigure() {
    Topic.hasMany(Comment);
}
