import { createProxyMiddleware } from 'http-proxy-middleware';

export const yandexApiProxyMiddleware = createProxyMiddleware({
    pathFilter: '/yandex-api',
    changeOrigin: true,
    cookieDomainRewrite: {
        '*': '',
    },
    pathRewrite: {
        '^/yandex-api': '/api',
    },
    target: 'https://ya-praktikum.tech/',
});
