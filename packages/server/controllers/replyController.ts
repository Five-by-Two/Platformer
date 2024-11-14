import { Request, Response, Router } from 'express';
import { CreateReplyDto } from '../dtos/CreateReplyDto';
import ReplyService from '../services/ReplyService';

export const replyController = Router();

replyController.get('/by-comment/:commentId', (req: Request, res: Response) =>
    ReplyService.getByCommentId(Number(req.params['commentId']))
        .then(replies => res.send(JSON.stringify(replies)))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);
replyController.get('/by-reply/:replyId', (req: Request, res: Response) =>
    ReplyService.getByReplyId(Number(req.params['replyId']))
        .then(replies => res.send(JSON.stringify(replies)))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);
replyController.get('/:replyId', (req: Request, res: Response) =>
    ReplyService.getByIdAsync(Number(req.params['replyId']))
        .then(reply => (reply === null ? res.sendStatus(204) : res.send(JSON.stringify(reply))))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);

replyController.post('/create', (req: Request, res: Response) => {
    const model = req.body as CreateReplyDto;
    ReplyService.createAsync(model)
        .then(result => res.send(result))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});
