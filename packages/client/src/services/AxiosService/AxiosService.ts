import axios from 'axios';

export const AxiosService = axios.create({
    baseURL: process.env.SERVER_URL,
    withCredentials: true,
});
