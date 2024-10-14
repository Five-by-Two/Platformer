/* eslint-disable no-unused-expressions */
import { EPlayerState } from '../../Enums';
import { Player } from '../classes/Player';
import { Sprite } from '../classes/Sprite';
import { GAME_KEYS } from '../configs/keys';
import { BG_IMAGE_HEIGHT, camera, scaledCanvas } from '../configs/main';

export function animateGame(
    player: Player,
    canvas: HTMLCanvasElement,
    background: Sprite,
    isGameStarted: boolean,
    gameOver: VoidFunction,
) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    function animate() {
        const animationId: number = window.requestAnimationFrame(animate);
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.scale(4, 4);
        context.translate(camera.position.x, camera.position.y);
        background.update();

        player.checkForHorizontalCanvasCollision();
        player.update();

        player.velocity.x = 0;

        if (isGameStarted) {
            if (GAME_KEYS.mbl.pressed) {
                player.lastDirection === 'right'
                    ? player.switchSprite(EPlayerState.Attack)
                    : player.switchSprite(EPlayerState.AttackLeft);
            } else if (GAME_KEYS.d.pressed) {
                player.switchSprite(EPlayerState.Run);
                player.velocity.x = 2;
                player.lastDirection = 'right';
                player.shouldPanCameraToTheLeft(canvas, camera);
            } else if (GAME_KEYS.a.pressed) {
                player.switchSprite(EPlayerState.RunLeft);
                player.velocity.x = -2;
                player.lastDirection = 'left';
                player.shouldPanCameraToTheRight(camera);
            } else if (player.velocity.y === 0) {
                if (player.lastDirection === 'right') player.switchSprite(EPlayerState.Idle);
                else player.switchSprite(EPlayerState.IdleLeft);
            }

            if (player.velocity.y < 0) {
                player.shouldPanCameraDown(camera);
                if (player.lastDirection === 'right') player.switchSprite(EPlayerState.Jump);
                else player.switchSprite(EPlayerState.JumpLeft);
            }
            // Запрет движения камеры вниз за движением персонажа для демонстрации условия окончания игры
            // } else if (player.velocity.y > 0) {
            //     player.shouldPanCameraUpwards(canvas, camera);
            //     if (player.lastDirection === 'right')
            //         player.switchSprite(EPlayerState.Fall);
            //     else player.switchSprite(EPlayerState.FallLeft);
            // }

            const lowerCameraLimit: number = camera.position.y - scaledCanvas.height;

            if (-player.position.y - 47 < lowerCameraLimit) {
                window.cancelAnimationFrame(animationId);
                gameOver();
            }
        } else {
            player.position.x = 120;
            player.position.y = 347;
            camera.position.x = 0;
            camera.position.y = -BG_IMAGE_HEIGHT + scaledCanvas.height;

            window.addEventListener('keypress', () => {
                window.cancelAnimationFrame(animationId);
            });
        }
        context.restore();
    }

    return animate;
}
