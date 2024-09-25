import { ICoordinates } from '../models';
import { collision } from '../utils/collision';
import { CollisionBlock } from './CollisionBlock';

const gravity = 0.5;

export class Player {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    position: ICoordinates;
    velocity: ICoordinates;
    collisionBlocks: CollisionBlock[];

    constructor(
        canvas: HTMLCanvasElement,
        position: ICoordinates,
        collisionBlocks: CollisionBlock[],
    ) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.position = position;
        this.velocity = { x: 0, y: 1 };
        this.width = 100;
        this.height = 100;
        this.collisionBlocks = collisionBlocks;
    }

    draw() {
        if (this.context) {
            this.context.fillStyle = 'red';
            this.context.fillRect(
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
        }
    }

    update() {
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
