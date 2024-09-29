import axios from 'axios';
import { TUser } from '../utils/types';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

const authApi = axios.create({
    baseURL: `${BASE_URL}/auth`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export function getUser() {
    return authApi
        .get<TUser>('/user')
        .then(res => res.data)
        .catch(err => {
            alert('Ошибка: Вы не авторизированы');
            console.log(err.message);
        });
}
