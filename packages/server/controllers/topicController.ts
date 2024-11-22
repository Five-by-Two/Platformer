import { Request, Response, Router } from 'express';
import { CreateTopicDto } from '../dtos/CreateTopicDto';
import { UpdateTopicDto } from '../dtos/UpdateTopicDto';
import TopicService from '../services/TopicService';

export const topicController = Router();

topicController.get('/all', (_: Request, res: Response) =>
    TopicService.getAllAsync()
        .then(topics => res.send(JSON.stringify(topics)))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);

topicController.get('/:topicId', (req: Request, res: Response) =>
    TopicService.getByIdAsync(Number(req.params['topicId']))
        .then(topic => (topic === null ? res.sendStatus(204) : res.send(JSON.stringify(topic))))
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        }),
);

topicController.post('/create', (req: Request, res: Response) => {
    const model = req.body as CreateTopicDto;
    TopicService.createAsync(model)
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error.message));
});

topicController.put('/update', (req: Request, res: Response) => {
    const model = req.body as UpdateTopicDto;
    TopicService.updateAsync(model)
        .then(() => res.send('ok'))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});

topicController.delete('/delete/:topicId', (req: Request, res: Response) => {
    TopicService.deleteAsync(Number(req.params['topicId']))
        .then(() => res.send('ok'))
        .catch(error => res.status(400).send(JSON.stringify(error.message)));
});
