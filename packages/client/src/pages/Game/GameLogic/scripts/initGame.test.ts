import { initGame } from './initGame';
import { initializePlayers } from './initializePlayer';
import { addEventListeners } from './addEventListeners';
import { animateGame } from './animate';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../configs/main';

jest.mock('./initializePlayer', () => ({
    initializePlayers: jest.fn(),
}));

jest.mock('./addEventListeners', () => ({
    addEventListeners: jest.fn(),
}));

jest.mock('./animate', () => ({
    animateGame: jest.fn(() => jest.fn()),
}));

describe('initGame', () => {
    let canvas: HTMLCanvasElement;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    });

    it('should initialize the canvas and player', () => {
        const gameOver = jest.fn();
        const isGameStarted = true;

        const mockPlayer = {}; // Мокаем игрока
        (initializePlayers as jest.Mock).mockReturnValue(mockPlayer); // Возвращаем мока игрока

        initGame(canvas, isGameStarted, gameOver);

        // Проверяем, что canvas имеет правильные размеры
        expect(canvas.width).toBe(CANVAS_WIDTH);
        expect(canvas.height).toBe(CANVAS_HEIGHT);

        // Проверяем, что инициализация игрока произошла
        expect(initializePlayers).toHaveBeenCalledWith(canvas);

        // Проверяем, что добавлены обработчики событий
        expect(addEventListeners).toHaveBeenCalledWith(mockPlayer);
    });

    it('should start the animation', () => {
        const gameOver = jest.fn();
        const isGameStarted = true;
        const mockAnimate = jest.fn(); // Мокаем анимацию

        (animateGame as jest.Mock).mockReturnValue(mockAnimate); // Возвращаем мок-функцию анимации

        initGame(canvas, isGameStarted, gameOver);

        // Проверяем, что анимация стартует
        expect(animateGame).toHaveBeenCalledWith(expect.anything(), canvas, expect.anything(), isGameStarted, gameOver);
        expect(mockAnimate).toHaveBeenCalled(); // Проверяем, что функция анимации была вызвана
    });
});
