/* eslint-disable no-unused-expressions */
import { EPlayerState } from '../../Enums';
import { Player } from '../classes/Player';
import { Sprite } from '../classes/Sprite';
import { GAME_KEYS } from '../configs/keys';
import { camera } from '../configs/main';

export function animateGame(player: Player, canvas: HTMLCanvasElement, background: Sprite) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    function animate() {
        window.requestAnimationFrame(animate);
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.scale(4, 4);
        context.translate(camera.position.x, camera.position.y);
        background.update();

        player.checkForHorizontalCanvasCollision();
        player.update();

        player.velocity.x = 0;

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
        } else if (player.velocity.y > 0) {
            player.shouldPanCameraUpwards(canvas, camera);
            if (player.lastDirection === 'right') player.switchSprite(EPlayerState.Fall);
            else player.switchSprite(EPlayerState.FallLeft);
        }
        context.restore();
    }

    return animate;
}
