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
    hitbox: any;

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
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        };
    }

    update() {
        this.updateFrames();
        this.updateHitbox();

        // draws out the image
        if (this.context) {
            this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
            this.context.fillRect(
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
            this.context.fillStyle = 'rgba(255, 0, 0, 0.2)';
            this.context?.fillRect(
                this.hitbox.position.x,
                this.hitbox.position.y,
                this.hitbox.width,
                this.hitbox.height,
            );
        }

        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollisions();
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26,
            },
            width: 14,
            height: 27,
        };
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision(this.hitbox, collisionBlock)) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;

                    const offset =
                        this.hitbox.position.x -
                        this.position.x +
                        this.hitbox.width;

                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x =
                        collisionBlock.position.x +
                        collisionBlock.width -
                        offset +
                        0.01;
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision(this.hitbox, collisionBlock)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset =
                        this.hitbox.position.y -
                        this.position.y +
                        this.hitbox.height;

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y =
                        collisionBlock.position.y +
                        collisionBlock.height +
                        0.01;
                    break;
                }
            }
        }
    }
}
