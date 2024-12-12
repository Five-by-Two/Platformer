import BackgroundImage from '../assets/img.png';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../configs/main';
import { initializePlayers } from './initializePlayer';
import { addEventListeners } from './addEventListeners';
import { animateGame } from './animate';
import { Background } from '@/pages/Game/GameLogic/classes/Background';

export function initGame(canvas: HTMLCanvasElement, isGameStarted: boolean, gameOver: (score: number) => void) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const player = initializePlayers(canvas);

    if (isGameStarted) addEventListeners(player);

    const background = new Background(context, BackgroundImage);

    const animate = animateGame(player, canvas, background, isGameStarted, gameOver);
    animate();
}
