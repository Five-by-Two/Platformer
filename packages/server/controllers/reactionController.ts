import { Request, Response, Router } from 'express';
import { CreateReactionDto } from '../dtos/CreateReactionDto';
import ReactionService from '../services/ReactionService';

export const reactionController = Router();

reactionController.get('/:reacitonId', (req: Request, res: Response) =>
    ReactionService.getByIdAsync(Number(req.params['reacitonId']))
        .then(reaction => (reaction === null ? res.sendStatus(204) : res.send(JSON.stringify(reaction))))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);

reactionController.delete('/delete/:reactionId', (req: Request, res: Response) => {
    ReactionService.deleteAsync(Number(req.params['reactionId']))
        .then(() => res.send('ok'))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});

reactionController.post('/add', async (req: Request, res: Response) => {
    try {
        const model = req.body as CreateReactionDto;
        const reaction = await ReactionService.addTopicReaction(model);
        return res.send(reaction);
    } catch (error) {
        console.error(error);
        return res.status(400).send(JSON.stringify({ message: 'Error creating reaction' }));
    }
});

reactionController.get('/by-topic/:topicId', (req: Request, res: Response) => {
    const topicId = req.params.topicId;
    ReactionService.getReactionsByTopic(Number(topicId))
        .then(reactions => res.send(reactions))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});
