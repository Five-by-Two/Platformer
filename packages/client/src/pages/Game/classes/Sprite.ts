import { IPosition } from '../models';

interface ISpiteConstructor {
    position: IPosition;
    imgSrc: string;
}

export class Sprite {
    canvasContext: CanvasRenderingContext2D;
    position: IPosition;
    image: HTMLImageElement;

    constructor(
        canvasContext: CanvasRenderingContext2D,
        { position, imgSrc }: ISpiteConstructor,
    ) {
        this.position = position;
        this.canvasContext = canvasContext;
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw() {
        if (!this.image) return;
        this.canvasContext.drawImage(
            this.image,
            this.position.x,
            this.position.y,
        );
    }

    update() {
        this.draw();
    }
}
