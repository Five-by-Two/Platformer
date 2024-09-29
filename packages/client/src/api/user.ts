import axios from 'axios';
import {
    TFormAvatarData,
    TFormPasswordData,
} from '../pages/Profile/Models/IFormProfileData';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

const userApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export function updateAvatar(data: TFormAvatarData) {
    const { avatar } = data;

    const formData = new FormData();
    formData.append('avatar', avatar[0]);

    return userApi
        .put('/user/profile/avatar', formData)
        .then(res => {
            console.log(`code: ${res.status}`);
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function updatePassword(data: TFormPasswordData) {
    const newData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
    };

    return userApi
        .put('/user/password', JSON.stringify(newData), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            console.log(`code: ${res.status}`);
        })
        .catch(err => {
            console.log(err.message);
        });
}
