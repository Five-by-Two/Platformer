import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import express from 'express';
import { createClientAndConnect } from './db';
import { yandexApiProxyMiddleware } from './middlewares/yandexApiProxyMiddleware';
import { GetServiceIdModel } from './models/GetServiceIdModel';

const { CLIENT_URL, SERVER_URL, API_URL, SERVER_PORT } = process.env;
console.log(CLIENT_URL, SERVER_URL, API_URL, SERVER_PORT);
const app = express();
app.use(
    cors({
        origin: CLIENT_URL,
        optionsSuccessStatus: 200,
        credentials: true,
    }),
);
const port = Number(SERVER_PORT) || 3001;

createClientAndConnect();

app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)');
});

app.post('/api/yandex-callback', req => {
    const code = req.body as string;
    return axios
        .post(`${process.env.API_URL}/api/v2/oauth/yandex`, {
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
            const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${model.service_id}&redirect_uri=${SERVER_URL}/api/yandex-callback`;
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
