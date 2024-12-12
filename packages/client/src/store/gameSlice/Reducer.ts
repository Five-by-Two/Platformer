import { createReducer } from '@reduxjs/toolkit';
import { setGameStartedAction, setGameOverAction, setCurrentScore, resetStoreState } from './Actions';
import { postPoints } from '@/store/thunks';

export interface IGameReducerState {
    isStarted: boolean;
    isGameOver: boolean;
    currentScore: number;
    bestScore: number;
}

const INITIAL_STATE: IGameReducerState = {
    isStarted: false,
    isGameOver: false,
    currentScore: 0,
    bestScore: 0,
};

export const gameReducer = createReducer(INITIAL_STATE, builder => {
    builder.addCase(setGameStartedAction, (reducerState, { payload }) => {
        reducerState.isStarted = payload;
    });

    builder.addCase(setGameOverAction, (reducerState, { payload }) => {
        reducerState.isGameOver = payload;
    });

    builder.addCase(setCurrentScore, (reducerState, { payload }) => {
        reducerState.currentScore = payload;
        if (payload > reducerState.bestScore) {
            reducerState.bestScore = payload;
            postPoints(reducerState.currentScore);
        }
    });

    builder.addCase(resetStoreState, () => {
        return INITIAL_STATE;
    });
});
