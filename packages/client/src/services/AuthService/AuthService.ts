import { AxiosError } from 'axios';
import AxiosService from '../AxiosService/AxiosService';
import { SignInModel } from './Models/SignInModel';
import { ErrorData } from './Models/ErrorData';

class AuthService {
    async SignIn(model: SignInModel): Promise<boolean> {
        return AxiosService.post('auth/signin', model)
            .then(() => true)
            .catch((ex: AxiosError) => {
                if (ex.response?.status == 400) {
                    const error = ex.response.data as ErrorData;
                    if (error.reason == 'User already in system') {
                        return true;
                    }
                }
                if (ex.response?.status == 401) {
                    throw new Error('Неверный логин или пароль');
                }
                throw new Error('Ошибка сервера');
            });
    }

    async LogOut(): Promise<boolean> {
        return AxiosService.post('auth/logout')
            .then(() => {
                return true;
            })
            .catch((ex: AxiosError) => {
                console.error('Ошибка выхода из системы', ex);
                return false;
            });
    }
}

export default new AuthService();
