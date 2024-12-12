import { Player } from '../classes/Player';
import { GAME_KEYS } from '../configs/keys';
import { JUMP_SPEED } from '@/pages/Game/GameLogic/configs/main';

export const addEventListeners = (player: Player) => {
    window?.addEventListener('keydown', event => {
        switch (event.code) {
            case 'KeyA':
            case 'ArrowLeft':
                GAME_KEYS.a.pressed = true;
                break;
            case 'KeyD':
            case 'ArrowRight':
                GAME_KEYS.d.pressed = true;
                break;
            case 'KeyW':
            case 'ArrowUp':
            case 'Space':
                if (player.velocity.y === 0) {
                    player.velocity.y = JUMP_SPEED;
                }
                break;
        }
    });

    window?.addEventListener('keyup', event => {
        switch (event.code) {
            case 'KeyA':
            case 'ArrowLeft':
                GAME_KEYS.a.pressed = false;
                break;
            case 'KeyD':
            case 'ArrowRight':
                GAME_KEYS.d.pressed = false;
                break;
        }
    });

    window?.addEventListener('click', () => {
        GAME_KEYS.mbl.pressed = true;
        setTimeout(() => {
            GAME_KEYS.mbl.pressed = false;
        }, 100);
    });
};
