import { TFormProfileData } from '@/pages/Profile/Models/IFormProfileData';
import UserService from '@/services/UserService/UserService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearUser, setUser } from './userSlice';
import { UpdateAvatarModel } from '@/services/UserService/Models/UpdateAvatarModel';
import AuthService from '@/services/AuthService/AuthService';
import { RootState } from './store';
import LeaderBoardService from '@/services/LeaderBoardService/LeaderBoardService';
import { setLeaders } from './leaderBoardSlice/leaderBoardSlice';

export const changeUser = createAsyncThunk(
    'user/changeUser',
    async function (data: TFormProfileData, { rejectWithValue, dispatch }) {
        try {
            const response = await UserService.UpdateUserData(data);

            if (!response) {
                throw new Error('Ошибка изменения данных');
            }
            dispatch(setUser(data));
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const changeAvatar = createAsyncThunk(
    'user/changeAvatar',
    async function (avatar: UpdateAvatarModel, { rejectWithValue, dispatch }) {
        try {
            const response = await UserService.UpdateAvatar(avatar);

            if (!response) {
                throw new Error('Ошибка изменения аватара');
            }
            dispatch(setUser(response));
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const deleteUser = createAsyncThunk('user/deleteUser', async function (_, { rejectWithValue, dispatch }) {
    try {
        const response = await AuthService.LogOut();

        if (!response) {
            throw new Error('Ошибка выхода из системы');
        }

        dispatch(clearUser());
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
    }
});

export const getUser = createAsyncThunk('user/getUser', async function (_, { rejectWithValue, dispatch }) {
    try {
        const response = await AuthService.GetUser();

        if (!response) {
            throw new Error('Ошибка получения данных пользователя');
        }
        dispatch(setUser(response));
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
    }
});

export const postPoints = createAsyncThunk<void, number, { state: RootState }>(
    'leaderBoard/postLeaderData',
    async function (points: number, { rejectWithValue, getState }) {
        try {
            const login = getState().user.user.login;
            await LeaderBoardService.PostUserPoints(login, points);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const setLeaderBoards = createAsyncThunk<void, number | undefined>(
    'leaderBoard/setLeaders',
    async function (cursor = 0, { rejectWithValue, dispatch }) {
        try {
            const response = await LeaderBoardService.GetLeaders(cursor);

            if (!response) {
                throw new Error('Ошибка получения данных таблицы лидеров');
            }

            const data = {
                leaders: response,
                cursor: cursor,
            };

            dispatch(setLeaders(data));
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);
