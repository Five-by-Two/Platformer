import { ICoordinates } from '../models';

const gravity = 0.5;

export class Player {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    height: number;
    position: ICoordinates;
    velocity: ICoordinates;

    constructor(canvas: HTMLCanvasElement, position: ICoordinates) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1,
        };
        this.height = 100;
    }

    draw() {
        if (this.context) {
            this.context.fillStyle = 'red';
            this.context.fillRect(
                this.position.x,
                this.position.y,
                100,
                this.height,
            );
        }
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (
            this.position.y + this.height + this.velocity.y <
            this.canvas.height
        ) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}
