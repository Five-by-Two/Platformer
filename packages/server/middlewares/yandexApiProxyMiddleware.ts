import { createProxyMiddleware } from 'http-proxy-middleware';

const API_URL = 'https://ya-praktikum.tech';

export const yandexApiProxyMiddleware = createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
        '*': '',
    },
    pathRewrite: {
        '^/yandex-api': '/api',
    },
    target: API_URL,
});
