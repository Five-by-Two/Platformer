import { CreateReactionDto } from '../dtos/CreateReactionDto';
import { Reaction } from '../sequelizeModels/Reaction';
import { Topic } from '../sequelizeModels/Topic';

const ReactionService = {
    getByIdAsync: async (id: number): Promise<Reaction | null> => {
        return Reaction.findByPk(id)
            .then(result => result as Reaction)
            .catch(error => {
                throw new Error(`Error get reaction by id: ${error}`);
            });
    },

    deleteAsync: async (id: number) => {
        return Reaction.destroy({
            where: { id: id },
        }).catch(error => {
            console.error(error);
        });
    },

    addTopicReaction: async (model: CreateReactionDto): Promise<Reaction> => {
        await Topic.findByPk(model.TopicId).then(topic => {
            if (topic === null) throw new Error('Topic not found');
        });

        const existingReaction = await Reaction.findOne({
            where: {
                TopicId: model.TopicId,
                authorName: model.authorName,
            },
        });

        if (existingReaction) {
            if (existingReaction.emojiCode === model.emojiCode) {
                await existingReaction.destroy();
                throw new Error('Reaction already exists and has been deleted');
            } else {
                existingReaction.emojiCode = model.emojiCode;
                await existingReaction.save();
                return existingReaction;
            }
        } else {
            const newReaction = await Reaction.create(model);
            return newReaction;
        }
    },

    getReactionsByTopic: async (topicId: number): Promise<Array<Reaction>> => {
        return await Reaction.findAll({
            where: { TopicId: topicId },
            include: { model: Topic },
        }).catch(error => {
            console.error('Error while getting reactions:', error);
            throw new Error('Error while getting reactions');
        });
    },
};

export default ReactionService;
