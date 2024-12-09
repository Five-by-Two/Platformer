import { Request, Response, Router } from 'express';
import { AxiosService } from '../services/AxiosService';

type GetServiceIdModel = {
    service_id: string;
};

// Получение сервисного идентификатора от Yandex OAuth
export const getYandexServiceId = async (_req: Request, res: Response): Promise<void> => {
    try {
        const { data } = await AxiosService.get<GetServiceIdModel>(
            `${process.env.API_URL}api/v2/oauth/yandex/service-id?redirect_uri=https://platformer5x2.ya-praktikum.tech/oauth/yandex-callback`,
        );
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
    const { code } = req.query;

    if (!code) {
        res.status(400).send('Missing authorization code');
        return;
    }

    try {
        return await AxiosService.post(`${process.env.API_URL}api/v2/oauth/yandex`, {
            code: code,
            redirect_uri: 'https://platformer5x2.ya-praktikum.tech',
        });
    } catch (error) {
        console.error('Error during Yandex OAuth callback:', error);
        res.status(500).send('Failed to process Yandex OAuth callback');
    }
};

export const yandexRouter = Router();

yandexRouter.get('/signin-by-yandex', getYandexServiceId);
yandexRouter.get('/yandex-callback', yandexCallback);
