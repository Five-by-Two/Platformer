import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import sass from 'sass';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isSSRBuild = mode === 'ssr';
    const ssrInput = {
        server: path.resolve(__dirname, 'server/index.ts'),
        entry: path.resolve(__dirname, 'src/entry-server.tsx'),
    };
    return {
        build: {
            ssr: isSSRBuild,
            outDir: isSSRBuild ? path.resolve(__dirname, 'dist/server') : path.resolve(__dirname, 'dist/client'),
            rollupOptions: {
                preserveModules: true,
                external: ['./yandexApiProxyMiddleware'],
                input: isSSRBuild ? ssrInput : path.resolve(__dirname, 'index.html'),
            },
        },
        server: {
            port: Number(process.env.CLIENT_PORT) || 3000,
        },
        define: {
            __SERVER_PORT__: process.env.SERVER_PORT || 3001,
            __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
            __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
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
    };
});
