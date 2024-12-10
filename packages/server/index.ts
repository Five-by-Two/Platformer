import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { apiController } from './controllers/apiController';
import { configureDatabase } from './db';
import { yandexApiProxyMiddleware } from './middlewares/auth';
import { authenticateMiddleware } from './middlewares/authenticateMiddleware';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
const port = Number(process.env.SERVER_PORT) || 3001;

const isDev = () => process.env.NODE_ENV === 'development';

configureDatabase();

app.use(yandexApiProxyMiddleware);

app.use(express.json());
if (isDev()) {
    app.use('/api', apiController);
} else {
    app.use('/api', authenticateMiddleware, apiController);
}

app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
