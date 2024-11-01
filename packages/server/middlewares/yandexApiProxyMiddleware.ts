import { createProxyMiddleware } from 'http-proxy-middleware';
import { API_URL } from '../constants/constants';

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
