import { ICoordinates } from '../../models';

// Размеры холста
export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 900;
// Скорость прыжка
export const JUMP_SPEED = -3.5;
// Начальная позиция игрока
export const PLAYER_START_X = 120;
export const PLAYER_START_Y = 347;
// Гравитация
export const GRAVITY = 0.1;
// Размеры хитбокса игрока
export const HITBOX_WIDTH = 14;
export const HITBOX_HEIGHT = 27;
// Смещение хитбокса игрока
export const HITBOX_OFFSET_X = 35;
export const HITBOX_OFFSET_Y = 26;
// Размеры камеры
export const CAMERA_WIDTH = 200;
export const CAMERA_HEIGHT = 80;
// Смещение камеры
export const CAMERA_OFFSET_X = 60;
// Высота, после которой камера не поднимается
export const CAMERA_UPPER_LIMIT = 432;
// Допустимая погрешность при позиционировании
export const POSITION_OFFSET = 0.01;
// Масштабирование игрового поля
export const SCALE_FACTOR = 3;
// Расстояние для генерации платформ
export const PLATFORM_GENERATION_OFFSET = 100;
// Смещение для проверки окончания игры
export const IDLE_OFFSET_Y = 47;

export const scaledCanvas = {
    width: CANVAS_WIDTH / SCALE_FACTOR, // Масштабированная ширина
    height: CANVAS_HEIGHT / SCALE_FACTOR, // Масштабированная высота
};

export const camera = {
    position: {
        x: 0, // Начальная позиция камеры по X
        y: -CAMERA_UPPER_LIMIT + scaledCanvas.height, // Начальная позиция камеры по Y
    },
};

export const initPlayerPosition: ICoordinates = {
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
};

// Коллизии
export const TILE_SIZE = 16; // Размер тайла
export const MAP_WIDTH = 36; // Ширина карты в тайлах
export const COLLISION_SYMBOL = 202; // Символ, обозначающий блок столкновения
