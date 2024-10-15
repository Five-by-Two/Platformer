import { Sprite } from '../classes/Sprite';
import BackgroundImage from '../assets/background.png';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../configs/main';
import { initializePlayers } from './initializePlayer';
import { addEventListeners } from './addEventListeners';
import { animateGame } from './animate';

export function initGame(canvas: HTMLCanvasElement, isGameStarted: boolean, gameOver: VoidFunction) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const player = initializePlayers(canvas);

    if (isGameStarted) addEventListeners(player);

    const background = new Sprite(context, {
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: BackgroundImage,
    });

    const animate = animateGame(player, canvas, background, isGameStarted, gameOver);
    animate();
}
