import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import express from 'express';
import { API_URL, CLIENT_URL, OAUTH_URL } from './constants/constants';
import { createClientAndConnect } from './db';
import { yandexApiProxyMiddleware } from './middlewares/yandexApiProxyMiddleware';
import { GetServiceIdModel } from './models/GetServiceIdModel';

const app = express();
app.use(
    cors({
        origin: CLIENT_URL,
        optionsSuccessStatus: 200,
        credentials: true,
    }),
);
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)');
});

app.post('/api/yandex-callback', req => {
    const code = req.body as string;
    axios
        .post(`${API_URL}/api/v2/oauth/yandex`, {
            code: code,
            redirect_url: CLIENT_URL,
        })
        .catch(error => {
            console.error('Error oauth authorize', error);
            throw error;
        });
});

app.post('/api/signin-by-yandex', (_, res) => {
    axios
        .get(`${API_URL}/api/v2/oauth/yandex/service-id`)
        .then(result => {
            const model = result.data as GetServiceIdModel;
            const url = OAUTH_URL.replace('{CLIENT_ID}', model.service_id);
            res.json(url);
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
});

app.use(yandexApiProxyMiddleware);

app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
