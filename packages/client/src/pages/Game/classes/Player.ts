import { ICoordinates } from '../models';
import { collision } from '../utils/collision';
import { CollisionBlock } from './CollisionBlock';
import { Sprite } from './Sprite';

const gravity = 0.5;

export class Player extends Sprite {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    position: ICoordinates;
    velocity: ICoordinates;
    collisionBlocks: CollisionBlock[];

    constructor(
        canvas: HTMLCanvasElement,
        position: ICoordinates,
        collisionBlocks: CollisionBlock[],
        imgSrc: string,
        frameRate?: number,
        scale = 0.5,
    ) {
        super(canvas.getContext('2d') as CanvasRenderingContext2D, {
            position,
            imgSrc,
            frameRate,
            scale,
        });
        this.velocity = { x: 0, y: 1 };
        this.position = position;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.collisionBlocks = collisionBlocks;
    }

    update() {
        this.updateFrames();
        if (this.context) {
            this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
        }
        this.context?.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );

        this.draw();

        this.position.x += this.velocity.x;
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions();
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision(this, collisionBlock)) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x =
                        collisionBlock.position.x - this.width - 0.01;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    this.position.x =
                        collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }
            }
        }
    }

    applyGravity() {
        if (
            this.position.y + this.height + this.velocity.y <
            this.canvas.height
        ) {
            this.position.y += this.velocity.y;
            this.velocity.y += gravity;
        }
        // else {
        //     this.velocity.y = 0;
        // }
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision(this, collisionBlock)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y =
                        collisionBlock.position.y - this.height - 0.01;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y =
                        collisionBlock.position.y +
                        collisionBlock.height +
                        0.01;
                }
            }
        }
    }
}
