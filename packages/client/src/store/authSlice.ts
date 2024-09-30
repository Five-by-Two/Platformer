import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    isAuth: boolean;
};

const defaultState: AuthState = {
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: defaultState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
});

export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
