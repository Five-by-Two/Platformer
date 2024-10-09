import { CollisionBlock } from '../classes/CollisionBlock';
import { floorCollisions, platformCollisions } from '../configs/collisions';

export const initializeCollisions = (context: CanvasRenderingContext2D) => {
    const collisionBlocks: CollisionBlock[] = [];
    const platformCollisionBlocks: CollisionBlock[] = [];
    const platformCollisions2D: number[][] = [];
    const floorCollisions2D = [];

    for (let i = 0; i < floorCollisions.length; i += 36) {
        floorCollisions2D.push(floorCollisions.slice(i, i + 36));
    }

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

    for (let i = 0; i < platformCollisions.length; i += 36) {
        platformCollisions2D.push(platformCollisions.slice(i, i + 36));
    }

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

    return {
        collisionBlocks,
        platformCollisionBlocks,
    };
};
