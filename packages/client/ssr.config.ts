import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import * as path from 'path';
import sass from 'sass';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'ssr.tsx'),
            name: 'Client',
            formats: ['cjs'],
        },
        rollupOptions: {
            output: {
                dir: 'ssr-dist',
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
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
});
