import { Request, Response, Router } from 'express';
import { CreateReactionDto } from '../dtos/CreateReactionDto';
import ReactionService from '../services/ReactionService';

export const reactionController = Router();

reactionController.get('/by-comment/:commentId', (req: Request, res: Response) =>
    ReactionService.getByCommentId(Number(req.params['commentId']))
        .then(reactions => res.send(JSON.stringify(reactions)))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);
reactionController.get('/:reacitonId', (req: Request, res: Response) =>
    ReactionService.getByIdAsync(Number(req.params['reacitonId']))
        .then(reaction => (reaction === null ? res.sendStatus(204) : res.send(JSON.stringify(reaction))))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);

reactionController.post('/create', (req: Request, res: Response) => {
    const model = req.body as CreateReactionDto;
    ReactionService.createAsync(model)
        .then(result => res.send(result))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});

reactionController.delete('/delete/:reactionId', (req: Request, res: Response) => {
    ReactionService.deleteAsync(Number(req.params['reactionId']))
        .then(() => res.send('ok'))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});
