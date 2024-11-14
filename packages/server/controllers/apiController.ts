import { Router } from 'express';
import { commentController } from './commentController';
import { topicController } from './topicController';

export const apiController = Router();

apiController.use('/topics', topicController);
apiController.use('/comments', commentController);
