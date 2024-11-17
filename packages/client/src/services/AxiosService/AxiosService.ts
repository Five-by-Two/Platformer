import axios from 'axios';
import { BASE_APP_API_UPL, BASE_YANDEX_API_URL } from './Models/Constants';

export const AxiosYandexService = axios.create({
    baseURL: BASE_YANDEX_API_URL,
    withCredentials: true,
});

export const AxiosAppService = axios.create({
    baseURL: BASE_APP_API_UPL,
});
