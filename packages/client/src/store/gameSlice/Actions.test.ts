import { setGameStartedAction, setGameOverAction, setCurrentScore, setBestScore, resetStoreState } from './Actions';

describe('Game Actions', () => {
    it('should create an action to set game started', () => {
        const expectedAction = {
            type: 'APPLICATION_GAME_SLICE_SET_STARTED',
            payload: true,
        };
        expect(setGameStartedAction(true)).toEqual(expectedAction);
    });

    it('should create an action to set game over', () => {
        const expectedAction = {
            type: 'APPLICATION_GAME_SLICE_SET_GAME_OVER',
            payload: true,
        };
        expect(setGameOverAction(true)).toEqual(expectedAction);
    });

    it('should create an action to set current score', () => {
        const expectedAction = {
            type: 'APPLICATION_GAME_SLICE_SET_GAME_CURRENT_SCORE',
            payload: 100,
        };
        expect(setCurrentScore(100)).toEqual(expectedAction);
    });

    it('should create an action to set best score', () => {
        const expectedAction = {
            type: 'APPLICATION_GAME_SLICE_SET_GAME_BEST_SCORE',
            payload: 200,
        };
        expect(setBestScore(200)).toEqual(expectedAction);
    });

    it('should create an action to reset store state', () => {
        const expectedAction = {
            type: 'APPLICATION_GAME_SLICE_RESET_STORE',
        };
        expect(resetStoreState()).toEqual(expectedAction);
    });
});
