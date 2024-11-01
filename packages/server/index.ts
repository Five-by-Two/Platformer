import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db';
import { yandexApiProxyMiddleware } from './middlewares/yandexApiProxyMiddleware';

const CLIENT_URL = 'http://localhost:3000';

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

app.use(yandexApiProxyMiddleware);

app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
