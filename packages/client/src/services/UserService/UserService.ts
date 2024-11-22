import { AxiosService } from '../AxiosService/AxiosService';
import { AxiosError } from 'axios';
import { UpdateAvatarModel } from './Models/UpdateAvatarModel';
import { UpdatePasswordModel } from './Models/UpdatePasswordModel';
import { UpdateUserDataModel } from './Models/UpdateUserDataModel';
import { UserModel } from './Models/UserModel';

class UserService {
    UpdateAvatar(data: UpdateAvatarModel): Promise<void | UserModel> {
        const { avatar } = data;

        const formData = new FormData();
        formData.append('avatar', avatar[0]);

        return AxiosService.put<UserModel>('yandex-api/v2/user/profile/avatar', formData)
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                alert('Ошибка изменения аватара');
                console.error('Ошибка изменения аватара', ex);
                return;
            });
    }

    async UpdatePassword(data: UpdatePasswordModel) {
        const dataRequest = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        try {
            return await AxiosService.put('yandex-api/v2/user/password', JSON.stringify(dataRequest), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (ex) {
            console.error('Ошибка изменения пароля', ex);
            return false;
        }
    }

    async UpdateUserData(data: UpdateUserDataModel): Promise<false | UserModel> {
        try {
            const res = await AxiosService.put<UserModel>('yandex-api/v2/user/profile', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return res.data;
        } catch (ex) {
            console.error('Ошибка изменения данных', ex);
            return false;
        }
    }
}

export default new UserService();
