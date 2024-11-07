import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultAvatar from '@/assets/images/avatar.png';
import { TUser } from '@/utils/types';
import { RootState } from '..';

interface ITestUser {
    name: string;
    secondName: string;
}

type TUserState = {
    data: ITestUser | null;
    user: Partial<TUser<number>> | null;
    isLoading: boolean;
};

const BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

const defaultState: TUserState = {
    data: null,
    user: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<TUser<number>>>) => {
            state.user = { ...state.user, ...action.payload };

            if (action.payload.avatar) {
                state.user.avatar = `${BASE_URL}${action.payload.avatar}`;
            } else if (!state.user.avatar) {
                state.user.avatar = defaultAvatar;
            }
        },
        clearUser: state => {
            state.user = defaultState.user;
        },
    },
});

export const selectUser = (state: RootState) => state.user.data;

export const { setUser, clearUser } = userSlice.actions;

export const { reducer } = userSlice;
