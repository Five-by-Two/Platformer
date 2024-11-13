import { Router } from 'express';
import TopicService from '../services/TopicService';

export const topicController = Router();

topicController.use('/', (_, res) => {
    TopicService.getAllAsync().then(topics => {
        res.send(JSON.stringify(topics));
    });
});
