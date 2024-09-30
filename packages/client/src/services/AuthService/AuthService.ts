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
                throw new Error('Неверный логин или пароль');
            });
    }
}

export default new AuthService();
