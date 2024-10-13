import { createAction } from '@reduxjs/toolkit';
import { GAME_ACTIONS_NAMESPACE } from './Consts';

export const setGameStartedAction = createAction<boolean>(`${GAME_ACTIONS_NAMESPACE}_SET_STARTED`);

export const setGameOverAction = createAction<boolean>(`${GAME_ACTIONS_NAMESPACE}_SET_GAME_OVER`);

export const setCurrentScore = createAction<number>(`${GAME_ACTIONS_NAMESPACE}_SET_GAME_CURRENT_SCORE`);

export const setBestScore = createAction<number>(`${GAME_ACTIONS_NAMESPACE}_SET_GAME_BEST_SCORE`);

export const resetStoreState = createAction(`${GAME_ACTIONS_NAMESPACE}_RESET_STORE`);
