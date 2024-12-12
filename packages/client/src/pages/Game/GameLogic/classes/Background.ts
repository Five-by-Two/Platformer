import { MAP_WIDTH, TILE_SIZE } from '../configs/main';

export class Background {
    private context: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private mapWidth: number;
    private scaledHeight: number;

    constructor(context: CanvasRenderingContext2D, imageSrc: string) {
        this.context = context;
        this.image = new Image();
        this.image.src = imageSrc;
        this.mapWidth = TILE_SIZE * MAP_WIDTH; // Ширина карты
        this.scaledHeight = 0; // Высота будет рассчитана после загрузки изображения

        // Рассчитываем пропорции после загрузки изображения
        this.image.onload = () => {
            const aspectRatio = this.image.height / this.image.width;
            this.scaledHeight = this.mapWidth * aspectRatio; // Высота с сохранением пропорций
        };
    }

    draw(cameraY: number, mapHeight: number) {
        if (!this.scaledHeight) return; // Ждём загрузки изображения

        //TODO пофиксить отрисовку фона
        const imgHeight = this.scaledHeight;
        const visibleFills = Math.ceil(mapHeight / imgHeight) + 5;
        // Устанавливаем фильтр для осветления
        this.context.filter = 'opacity(90%)';

        for (let i = -1; i < visibleFills; i++) {
            const yOffset = i * imgHeight - ((cameraY * 0.5) % imgHeight);
            this.context.drawImage(this.image, 0, yOffset, this.mapWidth, imgHeight);
        }

        // Сброс фильтра
        this.context.filter = 'none';
    }
}
