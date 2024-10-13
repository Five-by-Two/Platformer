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
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../consts';
import { ICoordinates } from '../models';
import { EPlayerState } from '../Enums';

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

const initPlayerPosition: ICoordinates = {
    x: 100,
    y: 350,
};

export function initGame(
    canvas: HTMLCanvasElement,
    isGameStarted: boolean,
    isGameStart: VoidFunction,
    isGameOver: VoidFunction,
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

    let animationId: number;
    let lowerCameraLimit: number;

    function animate() {
        animationId = window.requestAnimationFrame(animate);
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
        // console.log('lowerLimit', lowerCameraLimit);
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

            // console.log('CAMERA', camera.position.y);
            // console.log('Player', -player.position.y);
            // console.log('lowerCameraLimit', lowerCameraLimit);

            lowerCameraLimit = camera.position.y - scaledCanvas.height;
            console.log('lowerLimit', lowerCameraLimit);

            if (-player.position.y - 45 < lowerCameraLimit) {
                window.cancelAnimationFrame(animationId);
                // console.log('lowerLimit', lowerCameraLimit);
                // console.log(
                //     'Math.abs(player.position.y)',
                //     Math.abs(player.position.y)
                // );
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
        isGameOver();
    }

    animate();
}
