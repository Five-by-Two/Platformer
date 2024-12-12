import { ICoordinates } from '../../models';
import tilesetImage from '@/pages/Game/GameLogic/assets/tileset.png';
interface IConstructor {
    position: ICoordinates;
    height?: number;
}

export class CollisionBlock {
    position: ICoordinates;
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    tilesetImage: HTMLImageElement = new Image();

    constructor(context: CanvasRenderingContext2D, { position, height = 16 }: IConstructor) {
        this.context = context;
        this.position = position;
        this.width = 16;
        this.height = height;
        this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.tilesetImage.src = tilesetImage;
    }

    draw() {
        this.context.drawImage(this.tilesetImage, 0, 144, 32, 32, this.position.x, this.position.y, 16, 32);
    }

    update() {
        this.draw();
    }
}
