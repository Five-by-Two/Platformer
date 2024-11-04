import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './userSlice';
import leaderBoardReducer from './leaderBoardSlice/leaderBoardSlice';
import { gameReducer } from './gameSlice/Reducer';

export const reducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    leaderBoard: leaderBoardReducer,
});

export const store = configureStore({
    reducer,
    preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
