import { Sprite } from '../classes/Sprite';

import BackgroundImage from '../assets/background.png';
import { floorCollisions, platformCollisions } from '../collisions';
import { Player } from '../classes/Player';
import { CollisionBlock } from '../classes/CollisionBlock';

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
};

export function initGame(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const scaledCanvas = {
        width: canvas.width / 4,
        height: canvas.height / 4,
    };

    const floorCollisions2D = [];
    for (let i = 0; i < floorCollisions.length; i += 36) {
        floorCollisions2D.push(floorCollisions.slice(i, i + 36));
    }

    const collisionBlocks: CollisionBlock[] = [];

    floorCollisions2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 202) {
                collisionBlocks.push(
                    new CollisionBlock(context, {
                        position: {
                            x: x * 16,
                            y: y * 16,
                        },
                    }),
                );
            }
        });
    });

    const platformCollisions2D: number[][] = [];

    for (let i = 0; i < platformCollisions.length; i += 36) {
        platformCollisions2D.push(platformCollisions.slice(i, i + 36));
    }

    const platformCollisionBlocks: CollisionBlock[] = [];
    platformCollisions2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 202) {
                platformCollisionBlocks.push(
                    new CollisionBlock(context, {
                        position: {
                            x: x * 16,
                            y: y * 16,
                        },
                    }),
                );
            }
        });
    });

    canvas.width = 1024;
    canvas.height = 576;

    const player = new Player(canvas, {
        x: 0,
        y: 0,
    });
    const player2 = new Player(canvas, {
        x: 300,
        y: 100,
    });

    const background = new Sprite(context, {
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: BackgroundImage,
    });

    function animate() {
        window.requestAnimationFrame(animate);
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.save();
        // context.scale(4, 4);
        // context.translate(0, -background.image.height + scaledCanvas.height);
        background.update();

        collisionBlocks.forEach(block => {
            block.update();
        });
        platformCollisionBlocks.forEach(block => {
            block.update();
        });

        context.restore();

        player.update();
        player2.update();

        player.velocity.x = 0;

        if (keys.d.pressed) {
            player.velocity.x = 1;
        } else if (keys.a.pressed) {
            player.velocity.x = -1;
        }
    }

    animate();

    window.addEventListener('keydown', event => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                break;
            case 'a':
                keys.a.pressed = true;
                break;
            case 'w':
                player.velocity.y = -20;
                break;
        }
    });

    window.addEventListener('keyup', event => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = false;
                break;
            case 'a':
                keys.a.pressed = false;
                break;
        }
    });
}
