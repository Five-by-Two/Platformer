import { ICoordinates } from '../models';

interface ISpiteConstructor {
    position: ICoordinates;
    imgSrc: string;
    frameRate?: number;
    frameBuffer?: number;
    scale?: number;
}

export class Sprite {
    canvasContext: CanvasRenderingContext2D;
    position: ICoordinates;
    scale: number;
    image: HTMLImageElement;
    width = 0;
    height = 0;
    frameRate: number;
    currentFrame: number;
    frameBuffer: number;
    elapsedFrames = 0;

    constructor(
        canvasContext: CanvasRenderingContext2D,
        {
            position,
            imgSrc,
            frameRate = 1,
            frameBuffer = 3,
            scale = 1,
        }: ISpiteConstructor,
    ) {
        this.position = position;
        this.scale = scale;
        this.canvasContext = canvasContext;
        this.image = new Image();

        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale;
            this.height = this.image.height * this.scale;
        };
        this.image.src = imgSrc;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
    }

    draw() {
        if (!this.image) return;

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: 0,
        };

        this.canvasContext.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
    }

    update() {
        this.draw();
        this.updateFrames();
    }

    updateFrames() {
        this.elapsedFrames++;

        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
            else this.currentFrame = 0;
        }
    }
}
