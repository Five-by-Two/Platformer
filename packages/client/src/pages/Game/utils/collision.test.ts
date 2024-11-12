import { collision } from './collision';
import { CollisionBlock } from '../GameLogic/classes/CollisionBlock';
import { IHitBox } from '@/pages/Game/GameLogic/classes/Player';

describe('collision', () => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let object1: IHitBox;
    let object2: CollisionBlock;

    beforeEach(() => {
        // Создаем холст и контекст
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d') as CanvasRenderingContext2D;

        object1 = {
            position: { x: 0, y: 0 },
            width: 10,
            height: 10,
        };

        object2 = new CollisionBlock(context, { position: { x: 5, y: 5 }, height: 16 });
    });

    it('should detect collision when objects overlap', () => {
        expect(collision(object1, object2)).toBe(true);
    });

    it('should not detect collision when objects are separate', () => {
        object1.position.x = 25; // object1 правее
        expect(collision(object1, object2)).toBe(false);
    });

    it('should not detect collision when object1 is above object2', () => {
        object1.position.y = 30; // object1 выше
        object1.position.x = 5; // Перемещаем по X
        expect(collision(object1, object2)).toBe(false);
    });

    it('should detect collision when object1 is on the left of object2', () => {
        object1.position.x = -5; // перемещаем влево, но касается границы object2
        object1.position.y = 5; // на уровне object2
        expect(collision(object1, object2)).toBe(true);
    });

    it('should detect collision when object1 is on the right of object2', () => {
        object1.position.x = 21; // перемещаем вправо, но касается границы object2
        object1.position.y = 5; // на уровне object2
        expect(collision(object1, object2)).toBe(true);
    });
});
