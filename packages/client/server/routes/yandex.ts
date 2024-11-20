import { Router } from 'express';
import { getYandexServiceId, yandexCallback } from '../controllers/yandexController';

export const yandexRouter = Router();

yandexRouter.post('/signin-by-yandex', getYandexServiceId);
yandexRouter.post('/yandex-callback', yandexCallback);
