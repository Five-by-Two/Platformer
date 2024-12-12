import {
    CAMERA_HEIGHT,
    CAMERA_OFFSET_X,
    CAMERA_UPPER_LIMIT,
    CAMERA_WIDTH,
    GRAVITY,
    HITBOX_HEIGHT,
    HITBOX_OFFSET_X,
    HITBOX_OFFSET_Y,
    HITBOX_WIDTH,
    MAP_WIDTH,
    POSITION_OFFSET,
    SCALE_FACTOR,
    TILE_SIZE,
} from '../configs/main';
import { ICoordinates } from '../../models';
import { collision, platformCollision } from '../../utils/collision';
import { CollisionBlock } from './CollisionBlock';
import { PlatformBlock } from './PlatformBlock';

import { Sprite } from './Sprite';

interface IAnimations {
    imageSrc: string;
    frameRate: number;
    image: HTMLImageElement;
    frameBuffer: number;
}

interface ICamera {
    position: ICoordinates;
}

interface ICameraBox {
    position: ICoordinates;
    width: number;
    height: number;
}
export interface IHitBox {
    position: ICoordinates;
    width: number;
    height: number;
}

interface IPlayerConstructor {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    imgSrc: string;
    position: ICoordinates;
    velocity: ICoordinates;
    collisionBlocks: CollisionBlock[];
    platformCollisionBlocks: PlatformBlock[];
    animations: Record<string, IAnimations>;
    frameRate?: number;
    scale?: number;
}

export class Player extends Sprite {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    position: ICoordinates;
    velocity: ICoordinates;
    collisionBlocks: CollisionBlock[];
    platformCollisionBlocks: PlatformBlock[];
    animations: Record<string, IAnimations>;
    hitbox: IHitBox;
    lastDirection: string;
    cameraBox: ICameraBox;

    constructor(params: IPlayerConstructor) {
        super(params.canvas.getContext('2d') as CanvasRenderingContext2D, {
            position: params.position,
            imgSrc: params.imgSrc,
            frameRate: params.frameRate,
            scale: params.scale,
        });

        this.velocity = { x: 0, y: 1 };
        this.position = params.position;

        this.canvas = params.canvas;
        this.context = params.canvas.getContext('2d');
        this.collisionBlocks = params.collisionBlocks;
        this.platformCollisionBlocks = params.platformCollisionBlocks;
        this.lastDirection = 'right';
        this.hitbox = {
            position: { x: this.position.x, y: this.position.y },
            width: HITBOX_WIDTH,
            height: HITBOX_HEIGHT,
        };

        this.animations = params.animations;
        for (const key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }

        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: CAMERA_WIDTH,
            height: CAMERA_HEIGHT,
        };
    }

    switchSprite(key: string) {
        if (this.image === this.animations[key].image || !this.loaded) return;

        this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameBuffer;
    }

    updateCameraBox() {
        this.cameraBox = {
            position: {
                x: this.position.x - CAMERA_OFFSET_X,
                y: this.position.y,
            },
            width: CAMERA_WIDTH,
            height: CAMERA_HEIGHT,
        };
    }

    checkForHorizontalCanvasCollision() {
        if (this.hitbox.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        }
        const MAP_WIDTH_IN_PIXELS = MAP_WIDTH * TILE_SIZE;
        if (this.hitbox.position.x + HITBOX_WIDTH + this.velocity.x >= MAP_WIDTH_IN_PIXELS) {
            this.velocity.x = 0;
        }
    }

    shouldPanCameraToTheLeft(camera: ICamera) {
        const MAP_WIDTH_IN_PIXELS = MAP_WIDTH * TILE_SIZE;
        const cameraRightEdge = this.cameraBox.width + Math.abs(camera.position.x);

        if (MAP_WIDTH_IN_PIXELS <= this.cameraBox.width + this.cameraBox.position.x + TILE_SIZE) return;
        if (this.hitbox.position.x <= cameraRightEdge) return;

        camera.position.x -= this.velocity.x;
    }
    shouldPanCameraToTheRight(camera: ICamera) {
        if (this.cameraBox.position.x <= 0) return;
        if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }

    shouldPanCameraDown(camera: ICamera) {
        if (this.cameraBox.position.y < 0) {
            // 'Отрицательное положение камеры'
            if (Math.abs(this.cameraBox.position.y) > Math.abs(camera.position.y)) camera.position.y -= this.velocity.y;
        } else if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }

    shouldPanCameraUpwards(canvas: HTMLCanvasElement, camera: ICamera) {
        if (this.cameraBox.position.y + this.cameraBox.height + this.velocity.y >= CAMERA_UPPER_LIMIT) return;

        const scaledCanvasHeight = canvas.height / SCALE_FACTOR;

        if (this.cameraBox.position.y + this.cameraBox.height >= Math.abs(camera.position.y) + scaledCanvasHeight) {
            camera.position.y -= this.velocity.y;
        }
    }

    update() {
        this.updateFrames();
        this.updateHitBox();

        this.updateCameraBox();

        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitBox();
        this.checkForVerticalCollisions();
    }

    updateHitBox() {
        this.hitbox = {
            position: {
                x: this.position.x + HITBOX_OFFSET_X,
                y: this.position.y + HITBOX_OFFSET_Y,
            },
            width: HITBOX_WIDTH,
            height: HITBOX_HEIGHT,
        };
    }

    checkForHorizontalCollisions() {
        for (const collisionBlock of this.collisionBlocks) {
            if (collision(this.hitbox, collisionBlock)) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;

                    this.position.x = collisionBlock.position.x - offset - POSITION_OFFSET;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + POSITION_OFFSET;
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += GRAVITY;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision(this.hitbox, collisionBlock)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = collisionBlock.position.y - offset - POSITION_OFFSET;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + POSITION_OFFSET;
                    break;
                }
            }
        }

        // коллизии с платформами.
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];
            if (platformCollision(this.hitbox, platformCollisionBlock)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }

    updatePlatformBlocks(newPlatformBlocks: PlatformBlock[]) {
        this.platformCollisionBlocks = newPlatformBlocks;
    }
}
