import { createReducer } from '@reduxjs/toolkit';
import { toggleTheme } from './Actions';

export interface IThemeReducerState {
    currentTheme: string;
}

const INITIAL_STATE: IThemeReducerState = {
    currentTheme: 'light',
};

export const themeReducer = createReducer(INITIAL_STATE, builder => {
    builder.addCase(toggleTheme, (reducerState, { payload }) => {
        if (payload === true) {
            reducerState.currentTheme = 'dark';
        } else {
            reducerState.currentTheme = 'light';
        }
    });
});
