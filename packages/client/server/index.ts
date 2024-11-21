import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import serialize from 'serialize-javascript';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { yandexRouter } from './routes/yandex';
import { yandexApiProxyMiddleware } from './middlewares/auth';

dotenv.config();

const requiredEnv = ['CLIENT_URL', 'API_URL', 'CLIENT_PORT'];
requiredEnv.forEach(key => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

const { CLIENT_URL, CLIENT_PORT } = process.env;
const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
    const app = express();
    app.use(cors({ origin: CLIENT_URL, credentials: true }));

    app.use(express.json());

    app.use('/registerSW.js', express.static(path.resolve('dist/server', 'registerSW.js')));
    app.get('/manifest.webmanifest', (req, res) => {
        res.sendFile(path.resolve('dist/server', 'manifest.webmanifest'), {
            headers: { 'Content-Type': 'application/manifest+json' },
        });
    });
    app.get('/service-worker.js', (req, res) => {
        res.sendFile(path.resolve('dist/client', 'service-worker.js'), {
            headers: { 'Content-Type': 'application/javascript' },
        });
    });

    const port = Number(CLIENT_PORT) || 3000;
    let vite: ViteDevServer | undefined;

    const distPath = path.resolve('dist/client');
    const ssrClientPath = path.resolve('dist/server/entry.mjs');
    const srcPath = path.resolve();

    if (isDev) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });

        app.use(vite.middlewares);
    } else {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    }

    app.use('/api', yandexRouter);

    app.use(yandexApiProxyMiddleware);

    app.use('*', async (req, res, next) => {
        try {
            const template = fs.readFileSync(path.resolve(isDev ? srcPath : distPath, 'index.html'), 'utf-8');

            const { render } = isDev
                ? await vite!.ssrLoadModule(path.resolve(srcPath, 'src/entry-server.tsx'))
                : await import(ssrClientPath);

            const { html: appHtml, initialState } = await render();

            const html = template
                .replace('<!--ssr-outlet-->', appHtml)
                .replace(
                    '<!--ssr-initial-state-->',
                    `<script>window.APP_INITIAL_STATE=${serialize(initialState, { isJSON: true })}</script>`,
                );

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            if (isDev && vite) vite.ssrFixStacktrace(e as Error);
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`, CLIENT_URL);
    });
}

startServer();
