/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import serialize from 'serialize-javascript';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { apiController } from './controllers/apiController';
import { configureDatabase } from './db';
import { authenticateMiddleware } from './middlewares/authenticateMiddleware';
import { yandexApiProxyMiddleware } from './middlewares/yandexApiProxyMiddleware';
import { GetServiceIdModel } from './models/GetServiceIdModel';

dotenv.config();

const isDev = () => process.env.NODE_ENV === 'development';

const { CLIENT_URL, SERVER_URL, API_URL, SERVER_PORT } = process.env;

configureDatabase();

async function startServer() {
    const app = express();
    app.use(
        cors({
            origin: CLIENT_URL,
            credentials: true,
        }),
    );

    app.use(express.json());
    const port = Number(SERVER_PORT) || 3001;

    let vite: ViteDevServer | undefined;
    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path.dirname(require.resolve('client'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

    if (isDev()) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });

        app.use(vite.middlewares);
    }

    if (!isDev()) {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    }

    if (isDev()) {
        app.use('/api', apiController);
    } else {
        app.use('/api', authenticateMiddleware, apiController);
    }

    app.post('/api/yandex-callback', async req => {
        const code = req.body as string;
        try {
            return await axios.post(`${process.env.API_URL}/api/v2/oauth/yandex`, {
                code: code,
                redirect_url: CLIENT_URL,
            });
        } catch (error) {
            console.error('Error oauth authorize', error);
            throw error;
        }
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

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;

        try {
            let template: string;

            if (!isDev()) {
                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
            } else {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');

                template = await vite!.transformIndexHtml(url, template);
            }

            let render: () => Promise<{ html: string; initialState: unknown }>;

            if (!isDev()) {
                render = (await import(ssrClientPath)).render;
            } else {
                render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
            }

            const { html: appHtml, initialState } = await render();
            console.log(initialState);
            const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
                `<!--ssr-initial-state-->`,
                `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
                    isJSON: true,
                })}</script>`,
            );

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            if (isDev()) {
                vite!.ssrFixStacktrace(e as Error);
            }
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
