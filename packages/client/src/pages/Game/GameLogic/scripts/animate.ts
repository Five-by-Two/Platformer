/* eslint-disable no-unused-expressions */
import { EPlayerState } from '../../Enums';
import { Player } from '../classes/Player';
import { GAME_KEYS } from '../configs/keys';
import {
    CAMERA_UPPER_LIMIT,
    camera,
    IDLE_OFFSET_Y,
    PLAYER_START_X,
    PLAYER_START_Y,
    SCALE_FACTOR,
    scaledCanvas,
    TILE_SIZE,
} from '../configs/main';
import { initializeCollisions } from '@/pages/Game/GameLogic/scripts/initializeCollisions';
import { Background } from '@/pages/Game/GameLogic/classes/Background';

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
    background: Background,
    isGameStarted: boolean,
    gameOver: (score: number) => void,
) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const { collisionBlocks, platformCollisionBlocks, generatePlatforms, lastY } = initializeCollisions(context);
    let platformGenerationCooldown = false;
    const startHeight = player.position.y;
    let maxHeight = player.position.y;
    let score = 0;
    let lastColl = lastY;
    const PLATFORM_GENERATION_DELAY = 2000;

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

        // Обновление и отрисовка фона
        background.draw(camera.position.y, Math.abs(lastY * TILE_SIZE) + CAMERA_UPPER_LIMIT);

        player.checkForHorizontalCanvasCollision();
        player.update();

        // Проверяем достижение новой максимальной высоты
        if (player.position.y < maxHeight) {
            maxHeight = player.position.y; // Обновляем максимальную высоту
            score = Math.round(Math.abs(maxHeight - startHeight)); // Обновляем счёт
        }

        // Проверяем приближение игрока к границе карты
        if (lastColl * TILE_SIZE > player.position.y && !platformGenerationCooldown) {
            lastColl = generatePlatforms();
            player.updatePlatformBlocks(platformCollisionBlocks);
            // Обновление и отрисовка фона
            background.draw(camera.position.y, Math.abs(lastY * TILE_SIZE) + CAMERA_UPPER_LIMIT);

            platformGenerationCooldown = true;
            setTimeout(() => {
                platformGenerationCooldown = false;
            }, PLATFORM_GENERATION_DELAY);
        }

        platformCollisionBlocks.forEach(platform => platform.update());
        collisionBlocks.forEach(collision => collision.update());
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
                player.shouldPanCameraToTheLeft(camera);
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
                gameOver(score);
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

        // Отображение счёта
        context.restore();
        context.font = '24px Arial';

        // Настройка свечения
        context.shadowColor = 'rgba(255, 255, 0, 0.8)'; // Цвет свечения (жёлтый)
        context.shadowBlur = 10; // Размытие свечения
        context.fillStyle = 'white'; // Цвет текста
        context.fillText(`Score: ${Math.round(score)}`, 10, 30);

        // Сброс настроек свечения
        context.shadowColor = 'none';
        context.shadowBlur = 0;
    }

    return animate;
}
