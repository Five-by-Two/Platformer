import { Player } from '../classes/Player';
import { GAME_KEYS } from '../configs/keys';

export const addEventListeners = (player: Player) => {
    window.addEventListener('keydown', event => {
        switch (event.key) {
            case 'd':
                GAME_KEYS.d.pressed = true;
                break;
            case 'a':
                GAME_KEYS.a.pressed = true;
                break;
            case 'w':
                player.velocity.y = -2.5;
                break;
        }
    });

    window.addEventListener('keyup', event => {
        switch (event.key) {
            case 'd':
                GAME_KEYS.d.pressed = false;
                break;
            case 'a':
                GAME_KEYS.a.pressed = false;
                break;
        }
    });

    window.addEventListener('click', () => {
        GAME_KEYS.mbl.pressed = true;
        console.log('click');
        setTimeout(() => {
            GAME_KEYS.mbl.pressed = false;
        }, 100);
    });
};
