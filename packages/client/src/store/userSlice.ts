import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultAvatar from '../assets/images/avatar.png';
import { TUser } from '@/utils/types';

type UserState = {
    user: TUser<number | null>;
};

const BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

const defaultState: UserState = {
    user: {
        id: null,
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        login: '',
        avatar: defaultAvatar,
        email: '',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<Partial<TUser<number | null>>>,
        ) => {
            state.user = Object.assign(state.user, action.payload);
            if (action.payload.avatar) {
                state.user.avatar = `${BASE_URL}${action.payload.avatar}`;
            } else if (!action.payload.avatar && !state.user.avatar) {
                state.user.avatar = defaultAvatar;
            }
        },
        clearUser: state => {
            state.user = defaultState.user;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
