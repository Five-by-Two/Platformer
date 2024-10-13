import { Sprite } from '@/pages/Game/classes/Sprite';
import BackgroundImage from '@/pages/Game/assets/background.png';
import { floorCollisions, platformCollisions } from '@/pages/Game/collisions';
import { Player } from '@/pages/Game/classes/Player';
import { CollisionBlock } from '@/pages/Game/classes/CollisionBlock';
import WarriorIdle from '@/pages/Game/assets/warrior/Idle.png';
import WarriorIdleLeft from '@/pages/Game/assets/warrior/IdleLeft.png';
import WarriorRun from '@/pages/Game/assets/warrior/Run.png';
import WarriorJump from '@/pages/Game/assets/warrior/Jump.png';
import WarriorJumpLeft from '@/pages/Game/assets/warrior/JumpLeft.png';
import WarriorFall from '@/pages/Game/assets/warrior/Fall.png';
import WarriorFallLeft from '@/pages/Game/assets/warrior/FallLeft.png';
import WarriorRunLeft from '@/pages/Game/assets/warrior/RunLeft.png';
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    initPlayerPosition,
} from '@/pages/Game/consts';
import { EPlayerState } from '@/pages/Game/Enums';

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

export function initGame(
    canvas: HTMLCanvasElement,
    isGameStarted: boolean,
    setGameOverState: VoidFunction,
) {
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

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const player = new Player({
        context,
        velocity: {
            x: 4,
            y: 4,
        },
        scale: 0.5,
        canvas,
        imgSrc: WarriorIdle,
        position: initPlayerPosition,
        collisionBlocks,
        platformCollisionBlocks,
        frameRate: 8,
        animations: {
            [EPlayerState.Idle]: {
                imageSrc: WarriorIdle,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.IdleLeft]: {
                imageSrc: WarriorIdleLeft,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.Run]: {
                imageSrc: WarriorRun,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.RunLeft]: {
                imageSrc: WarriorRunLeft,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.Jump]: {
                imageSrc: WarriorJump,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            [EPlayerState.JumpLeft]: {
                imageSrc: WarriorJumpLeft,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            [EPlayerState.Fall]: {
                imageSrc: WarriorFall,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            [EPlayerState.FallLeft]: {
                imageSrc: WarriorFallLeft,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
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

    const backgroundImageHeight = 432;

    const camera = {
        position: {
            x: 0,
            y: -backgroundImageHeight + scaledCanvas.height,
        },
    };

    let isAnimationStarted = false;

    function animate() {
        let lowerCameraLimit: number;
        const animationId: number = window.requestAnimationFrame(animate);

        if (!isGameStarted) {
            player.position.x = 120;
            player.position.y = 347;
        }

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.scale(4, 4);
        context.translate(camera.position.x, camera.position.y);
        background.update();

        player.checkForHorizontalCanvasCollision();

        player.update();

        player.velocity.x = 0;
        context.restore();

        if (isGameStarted) {
            player.position = initPlayerPosition;
            if (keys.d.pressed) {
                player.switchSprite(EPlayerState.Run);
                player.velocity.x = 2;
                player.lastDirection = 'right';
                player.shouldPanCameraToTheLeft(canvas, camera);
            } else if (keys.a.pressed) {
                player.switchSprite(EPlayerState.RunLeft);
                player.velocity.x = -2;
                player.lastDirection = 'left';
                player.shouldPanCameraToTheRight(camera);
            } else if (player.velocity.y === 0) {
                if (player.lastDirection === 'right')
                    player.switchSprite(EPlayerState.Idle);
                else player.switchSprite(EPlayerState.IdleLeft);
            }

            if (player.velocity.y < 0) {
                player.shouldPanCameraDown(camera);
                if (player.lastDirection === 'right')
                    player.switchSprite(EPlayerState.Jump);
                else player.switchSprite(EPlayerState.JumpLeft);
            } else if (player.velocity.y > 0) {
                // Запрет движения камеры вниз за движением персонажа
                // player.shouldPanCameraUpwards(canvas, camera);
                if (player.lastDirection === 'right')
                    player.switchSprite(EPlayerState.Fall);
                else player.switchSprite(EPlayerState.FallLeft);
            }

            lowerCameraLimit = camera.position.y - scaledCanvas.height;

            if (-player.position.y - 47 < lowerCameraLimit) {
                window.cancelAnimationFrame(animationId);
                gameOver();
            }
            window.addEventListener('keydown', event => {
                switch (event.key) {
                    case 'd':
                        keys.d.pressed = true;
                        break;
                    case 'a':
                        keys.a.pressed = true;
                        break;
                    case 'w':
                        player.velocity.y = -2.5;
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
        } else {
            window.addEventListener('keypress', () => {
                window.cancelAnimationFrame(animationId);
            });
        }
    }

    function gameOver() {
        console.log('КОНЕЦ ИГРЫ!');
        setGameOverState();
    }

    if (!isAnimationStarted) {
        isAnimationStarted = true;
        animate();
    }
}
