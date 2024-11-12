import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { gameReducer } from './gameSlice/Reducer';

const reducer = combineReducers({
    user: userReducer,
    game: gameReducer,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
