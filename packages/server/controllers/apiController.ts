import { Router } from 'express';
import { topicController } from './topicController';

export const apiController = Router();

apiController.use('/topics', topicController);
