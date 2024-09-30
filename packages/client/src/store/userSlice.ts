import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultAvatar from '../assets/images/avatar.png';

type User = {
    id?: number | null;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    phone?: string;
    login?: string;
    avatar?: string | undefined;
    email?: string;
};

type UserState = {
    user: User;
};

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
        setUser: (state, action: PayloadAction<Partial<User>>) => {
            state.user = action.payload;
            if (action.payload.avatar) {
                state.user.avatar = `https://ya-praktikum.tech/api/v2/resources${action.payload.avatar}`;
            } else {
                state.user.avatar = defaultAvatar;
            }
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
