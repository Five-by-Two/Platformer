import AxiosService from '../AxiosService/AxiosService';
import { AxiosError } from 'axios';
import { UpdateAvatarModel } from './Models/UpdateAvatarModel';
import { UserModel } from './Models/UserModel';
import { UpdateUserDataModel } from './Models/UpdateUserDataModel';
import { UpdatePasswordModel } from './Models/UpdatePasswordModel';

class UserService {
    UpdateAvatar(data: UpdateAvatarModel): Promise<void | UserModel> {
        const { avatar } = data;

        const formData = new FormData();
        formData.append('avatar', avatar[0]);

        return AxiosService.put<UserModel>('user/profile/avatar', formData)
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                alert('Ошибка изменения аватара');
                console.error('Ошибка изменения аватара', ex);
                return;
            });
    }

    UpdatePassword(data: UpdatePasswordModel) {
        const dataRequest = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        return AxiosService.put('user/password', JSON.stringify(dataRequest), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch((ex: AxiosError) => {
            console.error('Ошибка изменения пароля', ex);
            return false;
        });
    }

    UpdateUserData(data: UpdateUserDataModel): Promise<false | UserModel> {
        return AxiosService.put<UserModel>(
            'user/profile',
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
            .then(res => res.data)
            .catch((ex: AxiosError) => {
                console.error('Ошибка изменения данных', ex);
                return false;
            });
    }
}

export default new UserService();
