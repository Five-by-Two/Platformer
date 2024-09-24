import { Sprite } from '../classes/Sprite';
import { IPosition } from '../models';
import BackgroundImage from '../assets/background.png';

const gravity = 0.5;

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
};

class Player {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;

    height: number;

    position: IPosition;

    velocity: IPosition;

    constructor(canvas: HTMLCanvasElement, position: IPosition) {
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

export function initGame(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const scaledCanvas = {
        width: canvas.width / 4,
        height: canvas.height / 4,
    };

    canvas.width = 1024;
    canvas.height = 576;

    const player = new Player(canvas, {
        x: 0,
        y: 0,
    });
    const player2 = new Player(canvas, {
        x: 300,
        y: 100,
    });

    const background = new Sprite(context, {
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: BackgroundImage,
    });

    function animate() {
        window.requestAnimationFrame(animate);
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.scale(4, 4);
        context.translate(0, -background.image.height + scaledCanvas.height);
        background.update();
        context.restore();

        player.update();
        player2.update();

        player.velocity.x = 0;

        if (keys.d.pressed) {
            player.velocity.x = 1;
        } else if (keys.a.pressed) {
            player.velocity.x = -1;
        }
    }

    animate();

    window.addEventListener('keydown', event => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                break;
            case 'a':
                keys.a.pressed = true;
                break;
            case 'w':
                player.velocity.y = -20;
                break;
        }
    });

    window.addEventListener('keyup', event => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = false;
                break;
            case 'a':
                keys.a.pressed = false;
                break;
        }
    });
}
