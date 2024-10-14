import { RootState } from '../store';

export const gameStartedSelector = (state: RootState) => state.game.isStarted;

export const gameOverSelector = (state: RootState) => state.game.isGameOver;
