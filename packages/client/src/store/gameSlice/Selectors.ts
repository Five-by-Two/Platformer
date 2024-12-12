import { RootState } from '..';

export const gameStartedSelector = (state: RootState) => state.game.isStarted;

export const gameOverSelector = (state: RootState) => state.game.isGameOver;

export const gameSelector = (state: RootState) => ({
    currentScore: state.game.currentScore,
    bestScore: state.game.bestScore,
});
