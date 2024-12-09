import axios from 'axios';

export const AxiosService = axios.create({
    withCredentials: true,
});
