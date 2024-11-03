import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import sass from 'sass';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT || 3001,
    },
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: 'default',
                ref: true,
                svgo: false,
                titleProp: true,
                icon: true,
            },
            include: '**/*.svg',
        }),
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'service-worker.ts',
            injectManifest: {
                injectionPoint: undefined,
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
                additionalData: `
                    @use '@/assets/styles/_vars.scss' as *;
                    @use '@/assets/styles/_mixins.scss' as *;
                    @use '@/assets/styles/_typography.scss' as *;
                `,
                silenceDeprecations: ['legacy-js-api'],
                implementation: sass,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        outDir: path.join(__dirname, 'dist'),
    },
});
