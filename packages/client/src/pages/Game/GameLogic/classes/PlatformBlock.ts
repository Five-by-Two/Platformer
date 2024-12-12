import { ICoordinates } from '../../models';

interface IPlatformConstructor {
    position: ICoordinates;
    tile: { x: number; y: number }; // Координаты тайла в tileset.png
    tileSize: number;
    tilesetImage: HTMLImageElement;
}

export class PlatformBlock {
    position: ICoordinates;
    tile: { x: number; y: number }; // Позиция тайла в тайлсете
    tileSize: number;
    tilesetImage: HTMLImageElement = new Image();
    context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, { position, tile, tileSize, tilesetImage }: IPlatformConstructor) {
        this.context = context;
        this.position = position;
        this.tile = tile; // Координаты тайла
        this.tileSize = tileSize;
        this.tilesetImage = tilesetImage;
    }

    draw() {
        this.context.drawImage(
            this.tilesetImage,
            this.tile.x * this.tileSize, // Координаты X в тайлсете
            this.tile.y * this.tileSize, // Координаты Y в тайлсете
            this.tileSize,
            this.tileSize, // Размер тайла в тайлсете
            this.position.x,
            this.position.y, // Координаты на экране
            this.tileSize,
            this.tileSize, // Размер платформы на экране
        );
    }

    update() {
        this.draw();
    }
}
