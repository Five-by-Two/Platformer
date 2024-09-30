import { AxiosError } from 'axios';
import AxiosService from '../AxiosService/AxiosService';
import { SignInModel } from './Models/SignInModel';

class AuthService {
    async SignIn(model: SignInModel): Promise<boolean> {
        return AxiosService.post('auth/signin', model)
            .then(() => {
                return true;
            })
            .catch((ex: AxiosError) => {
                console.error(ex);
                return false;
            });
    }
}

export default new AuthService();
