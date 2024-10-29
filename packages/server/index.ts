import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express, { Request, Response } from 'express';
// import { createClientAndConnect } from './db';
import * as path from 'path';
import * as fs from 'fs';

// const clientPath = path.join(__dirname, '..');
// const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
    const app = express();
    app.use(cors());
    const port = Number(process.env.SERVER_PORT) || 3001;

    app.get('/api', (_req: Request, res: Response) => {
        // res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        res.json('👋 Howdy from the server :)');
    });

    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

    app.use('/assets', express.static(path.resolve(distPath, 'assets')));

    app.use('*', async (_, res: Response, next) => {
        try {
            const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
            console.log('TEMPLATE:', template);
            const { render } = await import(ssrClientPath);
            console.log('render:', render);
            const appHtml = await render();
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace so it maps back
            // to your actual source code.
            // vite.ssrFixStacktrace(e);
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();

// createClientAndConnect();

// app.use(express.static(path.join(__dirname, '../client/dist')));
