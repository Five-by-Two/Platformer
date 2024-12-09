import axios from 'axios';
import { Request, Response, Router } from 'express';

type GetServiceIdModel = {
    service_id: string;
};

// Получение сервисного идентификатора от Yandex OAuth
export const getYandexServiceId = async (_req: Request, res: Response): Promise<void> => {
    try {
        const { data } = await axios.get<GetServiceIdModel>(`${process.env.API_URL}/api/v2/oauth/yandex/service-id`);
        const redirectUri = `https://platformer5x2.ya-praktikum.tech/oauth/yandex-callback`;
        const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${redirectUri}`;
        res.json({ url: authUrl });
    } catch (error) {
        console.error('Error fetching Yandex service ID:', error);
        res.status(500).send('Failed to fetch Yandex service ID');
    }
};

// Обработка обратного вызова от Yandex OAuth
export const yandexCallback = async (req: Request, res: Response): Promise<void> => {
    const { code } = req.body;

    if (!code) {
        res.status(400).send('Missing authorization code');
        return;
    }

    try {
        const response = await axios.post(`${process.env.API_URL}/api/v2/oauth/yandex`, {
            code: code,
            redirect_url: 'https://platformer5x2.ya-praktikum.tech',
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error during Yandex OAuth callback:', error);
        res.status(500).send('Failed to process Yandex OAuth callback');
    }
};

export const yandexRouter = Router();

yandexRouter.post('/signin-by-yandex', getYandexServiceId);
yandexRouter.post('/yandex-callback', yandexCallback);
