import { CollisionBlock } from '../classes/CollisionBlock';
import { floorCollisions, platformCollisions } from '../configs/collisions';
import { COLLISION_SYMBOL, MAP_WIDTH, TILE_SIZE } from '@/pages/Game/GameLogic/configs/main';

export const initializeCollisions = (context: CanvasRenderingContext2D) => {
    const collisionBlocks: CollisionBlock[] = [];
    const platformCollisionBlocks: CollisionBlock[] = [];
    const platformCollisions2D: number[][] = [];
    const floorCollisions2D: number[][] = [];

    // Преобразование массива floorCollisions в 2D
    for (let i = 0; i < floorCollisions.length; i += MAP_WIDTH) {
        floorCollisions2D.push(floorCollisions.slice(i, i + MAP_WIDTH));
    }

    // Генерация блоков столкновений для пола
    floorCollisions2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === COLLISION_SYMBOL) {
                collisionBlocks.push(
                    new CollisionBlock(context, {
                        position: {
                            x: x * TILE_SIZE,
                            y: y * TILE_SIZE,
                        },
                    }),
                );
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
                platformCollisionBlocks.push(
                    new CollisionBlock(context, {
                        position: {
                            x: x * TILE_SIZE,
                            y: y * TILE_SIZE,
                        },
                    }),
                );
            }
        });
    });

    return {
        collisionBlocks,
        platformCollisionBlocks,
    };
};
