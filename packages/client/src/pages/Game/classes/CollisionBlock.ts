import { ICoordinates } from '../models';

interface IConstructor {
    position: ICoordinates;
    height?: number;
}

export class CollisionBlock {
    position: ICoordinates;
    width: number;
    height: number;
    context: CanvasRenderingContext2D;

    constructor(
        context: CanvasRenderingContext2D,
        { position, height = 16 }: IConstructor,
    ) {
        this.context = context;
        this.position = position;
        this.width = 16;
        this.height = height;
    }

    draw() {
        this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';

        this.context?.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
    }

    update() {
        this.draw();
    }
}
