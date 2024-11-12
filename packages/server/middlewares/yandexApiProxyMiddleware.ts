import { createProxyMiddleware } from 'http-proxy-middleware';

export const yandexApiProxyMiddleware = createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
        '*': '',
    },
    pathRewrite: {
        '^/yandex-api': '/api',
    },
    target: process.env.API_URL ?? 'http://localhost',
});
