import { Request, Response, Router } from 'express';
import { CreateCommentDto } from '../dtos/CreateCommentDto';
import { UpdateCommentDto } from '../dtos/UpdateCommentDto';
import CommentService from '../services/CommentService';

export const commentController = Router();

commentController.get('/by-topic/:topicId', (req: Request, res: Response) =>
    CommentService.getByTopicId(Number(req.params['topicId']))
        .then(comments => res.send(JSON.stringify(comments)))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);

commentController.get('/:commentId', (req: Request, res: Response) =>
    CommentService.getByIdAsync(Number(req.params['commentId']))
        .then(comment => (comment === null ? res.sendStatus(204) : res.send(JSON.stringify(comment))))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);

commentController.post('/create', (req: Request, res: Response) => {
    const model = req.body as CreateCommentDto;
    CommentService.createAsync(model)
        .then(result => res.send(result))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});

commentController.put('/update', (req: Request, res: Response) => {
    const model = req.body as UpdateCommentDto;
    CommentService.updateAsync(model)
        .then(() => res.send('ok'))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});

commentController.delete('/delete/:commentId', (req: Request, res: Response) => {
    CommentService.deleteAsync(Number(req.params['commentId']))
        .then(() => res.send('ok'))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});
