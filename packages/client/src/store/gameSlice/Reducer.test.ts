import { gameReducer, IGameReducerState } from './Reducer';
import { setGameStartedAction, setGameOverAction, setCurrentScore, resetStoreState } from './Actions';

describe('Game Reducer', () => {
    const initialState: IGameReducerState = {
        isStarted: false,
        isGameOver: false,
        currentScore: 0,
        bestScore: 0,
    };

    it('should return the initial state', () => {
        expect(gameReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle setGameStartedAction', () => {
        expect(gameReducer(initialState, setGameStartedAction(true))).toEqual({
            ...initialState,
            isStarted: true,
        });
    });

    it('should handle setGameOverAction', () => {
        expect(gameReducer(initialState, setGameOverAction(true))).toEqual({
            ...initialState,
            isGameOver: true,
        });
    });

    it('should handle setCurrentScore', () => {
        const score = 150;
        expect(gameReducer(initialState, setCurrentScore(score))).toEqual({
            ...initialState,
            currentScore: score,
            bestScore: score,
        });
    });

    it('should reset store state', () => {
        const modifiedState = {
            isStarted: true,
            isGameOver: true,
            currentScore: 150,
            bestScore: 300,
        };
        expect(gameReducer(modifiedState, resetStoreState())).toEqual(initialState);
    });
});
