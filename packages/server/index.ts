import serialize from 'serialize-javascript';
import cors from 'cors';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';
import axios from 'axios';
import { yandexApiProxyMiddleware } from './middlewares/yandexApiProxyMiddleware';
import { GetServiceIdModel } from './models/GetServiceIdModel';

dotenv.config();

const isDev = () => process.env.NODE_ENV === 'development';

const { CLIENT_URL, SERVER_URL, API_URL, SERVER_PORT } = process.env;

async function startServer() {
    const app = express();
    app.use(
        cors({
            origin: CLIENT_URL,
            optionsSuccessStatus: 200,
            credentials: true,
        }),
    );
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

    app.use(yandexApiProxyMiddleware);

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

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
