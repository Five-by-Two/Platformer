import { ICoordinates } from '../models';

interface IConstructor {
    position: ICoordinates;
}

export class CollisionBlock {
    position: ICoordinates;
    width: number;
    height: number;
    context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, { position }: IConstructor) {
        this.context = context;
        this.position = position;
        this.width = 16;
        this.height = 16;
    }

    draw() {
        // this.context.fillStyle = 'rgba(255, 0, 0, 0)';
        this.context.fillStyle = 'red';

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
