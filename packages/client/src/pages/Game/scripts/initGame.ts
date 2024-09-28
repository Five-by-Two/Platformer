import { Sprite } from '../classes/Sprite';
import BackgroundImage from '../assets/background.png';
import { floorCollisions, platformCollisions } from '../collisions';
import { Player } from '../classes/Player';
import { CollisionBlock } from '../classes/CollisionBlock';
import WarriorIdle from '../assets/warrior/Idle.png';
import WarriorIdleLeft from '../assets/warrior/IdleLeft.png';
import WarriorRun from '../assets/warrior/Run.png';
import WarriorJump from '../assets/warrior/Jump.png';
import WarriorJumpLeft from '../assets/warrior/JumpLeft.png';
import WarriorFall from '../assets/warrior/Fall.png';
import WarriorFallLeft from '../assets/warrior/FallLeft.png';
import WarriorRunLeft from '../assets/warrior/RunLeft.png';

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

    const player = new Player({
        context,
        velocity: {
            x: 4,
            y: 4,
        },
        scale: 0.5,
        canvas,
        imgSrc: WarriorIdle,
        position: {
            x: 100,
            y: 300,
        },
        collisionBlocks,
        frameRate: 8,
        animations: {
            Idle: {
                imageSrc: WarriorIdle,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            IdleLeft: {
                imageSrc: WarriorIdleLeft,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            Run: {
                imageSrc: WarriorRun,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            Jump: {
                imageSrc: WarriorJump,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            JumpLeft: {
                imageSrc: WarriorJumpLeft,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            Fall: {
                imageSrc: WarriorFall,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            FallLeft: {
                imageSrc: WarriorFallLeft,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            RunLeft: {
                imageSrc: WarriorRunLeft,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
        },
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
        context.scale(4, 4);
        context.translate(0, -background.image.height + scaledCanvas.height);
        background.update();
        collisionBlocks.forEach(collisionBlock => {
            collisionBlock.update();
        });
        platformCollisionBlocks.forEach(block => {
            block.update();
        });

        player.update();

        player.velocity.x = 0;
        if (keys.d.pressed) {
            player.switchSprite('Run');
            player.velocity.x = 2;
            player.lastDirection = 'right';
        } else if (keys.a.pressed) {
            player.switchSprite('RunLeft');
            player.velocity.x = -2;
            player.lastDirection = 'left';
        } else if (player.velocity.y === 0) {
            if (player.lastDirection === 'right') player.switchSprite('Idle');
            else player.switchSprite('IdleLeft');
        }

        if (player.velocity.y < 0) {
            if (player.lastDirection === 'right') player.switchSprite('Jump');
            else player.switchSprite('JumpLeft');
        } else if (player.velocity.y > 0) {
            if (player.lastDirection === 'right') player.switchSprite('Fall');
            else player.switchSprite('FallLeft');
        }
        context.restore();
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
                player.velocity.y = -8;
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
