import { gameStartedSelector, gameOverSelector } from './Selectors';
import { RootState } from '@/store/store';

describe('Game Selectors', () => {
    const mockState = {
        game: {
            isStarted: true,
            isGameOver: false,
            currentScore: 100,
            bestScore: 200,
        },
    };

    it('should select game started state', () => {
        expect(gameStartedSelector(mockState as RootState)).toEqual(true);
    });

    it('should select game over state', () => {
        expect(gameOverSelector(mockState as RootState)).toEqual(false);
    });
});
