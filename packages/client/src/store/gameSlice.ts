import { createSlice } from '@reduxjs/toolkit';

type GameState = {
    isGameStarted: boolean;
    isGameOver: boolean;
};

const initialGameState: GameState = {
    isGameStarted: false,
    isGameOver: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameState,
    reducers: {
        startGame(state) {
            state.isGameStarted = true;
            state.isGameOver = false;
        },
        gameOver(state) {
            state.isGameOver = true;
        },

        restartGame(state) {
            state.isGameStarted = false;
            state.isGameOver = false;
        },
    },
});

export const { startGame, gameOver, restartGame } = gameSlice.actions;
export default gameSlice.reducer;
