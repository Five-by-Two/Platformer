import axios from 'axios';
import {
    TFormAvatarData,
    TFormPasswordData,
    TFormProfileData,
} from '../pages/Profile/Models/IFormProfileData';
import { TProfileData, TUser } from '../utils/types';
import { BASE_URL } from '../utils/constants';

const userApi = axios.create({
    baseURL: `${BASE_URL}/user`,
    withCredentials: true,
});

export function updateAvatar(data: TFormAvatarData) {
    const { avatar } = data;

    const formData = new FormData();
    formData.append('avatar', avatar[0]);

    return userApi.put<TUser>('/profile/avatar', formData).catch(err => {
        console.log(err.message);
    });
}

export function updatePassword(data: TFormPasswordData) {
    const dataRequest = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
    };

    return userApi
        .put('/password', JSON.stringify(dataRequest), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function updateUserData(data: TFormProfileData) {
    return userApi
        .put('/profile', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .catch(err => {
            console.log(err.message);
        });
}
