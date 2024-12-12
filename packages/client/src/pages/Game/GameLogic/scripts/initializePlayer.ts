import { Player } from '../classes/Player';
import { initializeCollisions } from './initializeCollisions';
import { initPlayerPosition } from '../configs/main';
import { WarriorIdle } from '../configs/playerConfig';
import { initializeAnimations } from '@/pages/Game/GameLogic/scripts/playerAnimations';

const DEFAULT_VELOCITY = { x: 4, y: 4 }; // Стандартная скорость игрока
const DEFAULT_SCALE = 0.5; // Масштаб игрока
const DEFAULT_FRAME_RATE = 8; // Частота кадров для большинства анимаций

/**
 * Инициализация игрока
 * @param canvas HTMLCanvasElement
 * @returns Экземпляр игрока
 */
export function initializePlayers(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const { collisionBlocks, platformCollisionBlocks } = initializeCollisions(context);

    const animations = initializeAnimations();

    return new Player({
        context,
        velocity: DEFAULT_VELOCITY,
        scale: DEFAULT_SCALE,
        canvas,
        imgSrc: WarriorIdle,
        position: initPlayerPosition,
        collisionBlocks,
        platformCollisionBlocks,
        frameRate: DEFAULT_FRAME_RATE,
        animations,
    });
}
