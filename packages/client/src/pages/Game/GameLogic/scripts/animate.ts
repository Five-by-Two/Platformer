/* eslint-disable no-unused-expressions */
import { EPlayerState } from '../../Enums';
import { Player } from '../classes/Player';
import { Sprite } from '../classes/Sprite';
import { GAME_KEYS } from '../configs/keys';
import {
    CAMERA_UPPER_LIMIT,
    camera,
    IDLE_OFFSET_Y,
    PLATFORM_GENERATION_OFFSET,
    PLAYER_START_X,
    PLAYER_START_Y,
    SCALE_FACTOR,
    scaledCanvas,
} from '../configs/main';
import { initializeCollisions } from '@/pages/Game/GameLogic/scripts/initializeCollisions';
import { CollisionBlock } from '@/pages/Game/GameLogic/classes/CollisionBlock';

/**
 * Анимация игры
 * @param player Игрок
 * @param canvas HTML элемент канваса
 * @param background Спрайт фона
 * @param isGameStarted Флаг, указывающий, начата ли игра
 * @param gameOver Функция завершения игры
 * @returns Функция анимации
 */
export function animateGame(
    player: Player,
    canvas: HTMLCanvasElement,
    background: Sprite,
    isGameStarted: boolean,
    gameOver: VoidFunction,
) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const { collisionBlocks } = initializeCollisions(context);

    /**
     * Генерация новых платформ выше игрока
     */
    function generatePlatforms() {
        const newPlatform = new CollisionBlock(context, {
            position: {
                x: Math.random() * canvas.width, // Случайная позиция по X
                y: player.position.y - PLATFORM_GENERATION_OFFSET, // Выше текущей позиции игрока
            },
        });
        collisionBlocks.push(newPlatform);
    }

    /**
     * Основная функция анимации
     */
    function animate() {
        const animationId: number = window.requestAnimationFrame(animate);

        // Очистка и масштабирование холста
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.scale(SCALE_FACTOR, SCALE_FACTOR);
        context.translate(camera.position.x, camera.position.y);

        // Обновление фона и игрока
        background.update();
        player.checkForHorizontalCanvasCollision();
        player.update();

        // Генерация платформ при достижении определенной высоты
        if (player.position.y < canvas.height / 2) {
            generatePlatforms();
        }

        // Сброс горизонтальной скорости игрока
        player.velocity.x = 0;

        if (isGameStarted) {
            // Логика управления
            if (GAME_KEYS.mbl.pressed) {
                // Атака
                if (player.lastDirection === 'right') player.switchSprite(EPlayerState.Attack);
                else player.switchSprite(EPlayerState.AttackLeft);
            } else if (GAME_KEYS.d.pressed) {
                // Движение вправо
                player.switchSprite(EPlayerState.Run);
                player.velocity.x = 1;
                player.lastDirection = 'right';
                player.shouldPanCameraToTheLeft(canvas, camera);
            } else if (GAME_KEYS.a.pressed) {
                // Движение влево
                player.switchSprite(EPlayerState.RunLeft);
                player.velocity.x = -1;
                player.lastDirection = 'left';
                player.shouldPanCameraToTheRight(camera);
            } else if (player.velocity.y === 0) {
                // Состояние покоя
                if (player.lastDirection === 'right') player.switchSprite(EPlayerState.Idle);
                else player.switchSprite(EPlayerState.IdleLeft);
            }

            if (player.velocity.y < 0) {
                // Прыжок
                player.shouldPanCameraDown(camera);
                if (player.lastDirection === 'right') player.switchSprite(EPlayerState.Jump);
                else player.switchSprite(EPlayerState.JumpLeft);
            } else if (player.velocity.y > 0) {
                // Падение
                player.shouldPanCameraUpwards(canvas, camera);
                if (player.lastDirection === 'right') player.switchSprite(EPlayerState.Fall);
                else player.switchSprite(EPlayerState.FallLeft);
            }

            // Проверка условия окончания игры
            const lowerCameraLimit: number = camera.position.y - scaledCanvas.height;
            if (-player.position.y - IDLE_OFFSET_Y < lowerCameraLimit) {
                window.cancelAnimationFrame(animationId);
                gameOver();
            }
        } else {
            // Сброс позиций при начале игры
            player.position.x = PLAYER_START_X;
            player.position.y = PLAYER_START_Y;
            camera.position.x = 0;
            camera.position.y = -CAMERA_UPPER_LIMIT + scaledCanvas.height;

            // Остановка анимации при нажатии клавиши
            window.addEventListener('keypress', () => {
                window.cancelAnimationFrame(animationId);
            });
        }

        context.restore();
    }

    return animate;
}
