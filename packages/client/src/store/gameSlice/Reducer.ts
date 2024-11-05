import { createReducer } from '@reduxjs/toolkit';
import { setGameStartedAction, setGameOverAction, setCurrentScore, resetStoreState } from './Actions';

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
    });

    builder.addCase(resetStoreState, () => {
        return INITIAL_STATE;
    });
});
