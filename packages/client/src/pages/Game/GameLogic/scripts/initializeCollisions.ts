import { CollisionBlock } from '../classes/CollisionBlock';
import { floorCollisions, platformCollisions } from '../configs/collisions';
import { COLLISION_SYMBOL, MAP_WIDTH, TILE_SIZE } from '@/pages/Game/GameLogic/configs/main';
import { PlatformBlock } from '@/pages/Game/GameLogic/classes/PlatformBlock';
import tileSetImage from '@/pages/Game/GameLogic/assets/tileset.png';

export const initializeCollisions = (context: CanvasRenderingContext2D) => {
    const collisionBlocks: CollisionBlock[] = [];
    const platformCollisionBlocks: PlatformBlock[] = [];
    const platformCollisions2D: number[][] = [];
    const floorCollisions2D: number[][] = [];
    const tilesetImage = new Image();
    tilesetImage.src = tileSetImage;
    let lastY = 0;
    // Преобразование массива floorCollisions в 2D
    for (let i = 0; i < floorCollisions.length; i += MAP_WIDTH) {
        floorCollisions2D.push(floorCollisions.slice(i, i + MAP_WIDTH));
    }

    // Генерация блоков столкновений для пола
    floorCollisions2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === COLLISION_SYMBOL) {
                const block = new CollisionBlock(context, {
                    position: {
                        x: x * TILE_SIZE,
                        y: y * TILE_SIZE,
                    },
                });
                collisionBlocks.push(block);
            }
        });
    });

    // Преобразование массива platformCollisions в 2D
    for (let i = 0; i < platformCollisions.length; i += MAP_WIDTH) {
        platformCollisions2D.push(platformCollisions.slice(i, i + MAP_WIDTH));
    }

    // Генерация блоков столкновений для платформ
    platformCollisions2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === COLLISION_SYMBOL) {
                const block = new PlatformBlock(context, {
                    position: {
                        x: x * TILE_SIZE,
                        y: y * TILE_SIZE,
                    },
                    tile: { x: 6, y: 4 },
                    tileSize: TILE_SIZE,
                    tilesetImage,
                });
                platformCollisionBlocks.push(block);
            }
        });
    });

    function getRandomNumber(min = 1, max = MAP_WIDTH) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const generateRowArray = (even: boolean) => {
        const row = Array.from({ length: MAP_WIDTH }, () => 0);
        const randomStart1 = getRandomNumber(0, MAP_WIDTH - 3);
        let randomStart2;
        do {
            randomStart2 = getRandomNumber(0, MAP_WIDTH - 3);
        } while (Math.abs(randomStart1 - randomStart2) < 3); // Минимальное расстояние между вставками
        row.splice(randomStart1, 3, COLLISION_SYMBOL, COLLISION_SYMBOL, COLLISION_SYMBOL);
        if (even) row.splice(randomStart2, 3, COLLISION_SYMBOL, COLLISION_SYMBOL, COLLISION_SYMBOL);
        return row;
    };

    const generateColumn = () => Array.from({ length: MAP_WIDTH }, (v, i) => generateRowArray(i % 2 === 0));

    const generatePlatforms = () => {
        generateColumn().forEach(row => {
            lastY--;
            row.forEach((symbol, x) => {
                if (symbol === COLLISION_SYMBOL) {
                    const block = new PlatformBlock(context, {
                        position: {
                            x: x * TILE_SIZE,
                            y: lastY * TILE_SIZE,
                        },
                        tile: { x: 6, y: 4 },
                        tileSize: TILE_SIZE,
                        tilesetImage,
                    });
                    platformCollisionBlocks.push(block);
                }
            });
        });

        return lastY;
    };

    return {
        collisionBlocks,
        platformCollisionBlocks,
        generatePlatforms,
        lastY,
    };
};
