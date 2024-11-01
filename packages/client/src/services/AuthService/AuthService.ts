import { AxiosError } from 'axios';
import AxiosService from '../AxiosService/AxiosService';
import { ErrorData } from './Models/ErrorData';
import { GetUserModel } from './Models/GetUserModel';
import { SignInModel } from './Models/SignInModel';
import { SignUpModel } from './Models/SignUpModel';

class AuthService {
    async SignIn(model: SignInModel): Promise<boolean> {
        return AxiosService.post('yandex-api/v2/auth/signin', model)
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
        return AxiosService.post('yandex-api/v2/auth/logout')
            .then(() => {
                return true;
            })
            .catch((ex: AxiosError) => {
                console.error('Ошибка выхода из системы', ex);
                return false;
            });
    }

    async GetUser(): Promise<GetUserModel | void> {
        return AxiosService.get<GetUserModel>('yandex-api/v2/auth/user')
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка получения данных пользователя', ex);
                return;
            });
    }

    async SignUp(model: SignUpModel): Promise<boolean> {
        return AxiosService.post('yandex-api/v2/auth/signup', model)
            .then(() => {
                return true;
            })
            .catch((ex: AxiosError) => {
                console.error('Ошибка регистрации', ex);
                return false;
            });
    }
}

export default new AuthService();
