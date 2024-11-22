import axios from 'axios';
import { BASE_SERVER_URL } from './Models/Constants';

export const AxiosService = axios.create({
    baseURL: BASE_SERVER_URL,
    withCredentials: true,
});
