import { CollisionBlock } from './CollisionBlock';
import { ICoordinates } from '../../models';

describe('CollisionBlock', () => {
    let context: CanvasRenderingContext2D;
    let block: CollisionBlock;
    const position: ICoordinates = { x: 10, y: 20 };

    beforeEach(() => {
        const canvas = document.createElement('canvas');
        context = canvas.getContext('2d') as CanvasRenderingContext2D;

        block = new CollisionBlock(context, { position });
    });

    it('should initialize with correct properties', () => {
        expect(block.position).toEqual(position);
        expect(block.width).toBe(16);
        expect(block.height).toBe(16); // По умолчанию высота 16
        expect(block.context).toBe(context);
        expect(block.context.fillStyle).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('should draw the rectangle on the canvas', () => {
        const fillRectSpy = jest.spyOn(context, 'fillRect');

        block.draw();

        expect(fillRectSpy).toHaveBeenCalledWith(position.x, position.y, block.width, block.height);
    });

    it('should update the block by calling draw', () => {
        const drawSpy = jest.spyOn(block, 'draw');

        block.update();

        expect(drawSpy).toHaveBeenCalled();
    });

    it('should allow custom height', () => {
        const customHeight = 32;
        const customBlock = new CollisionBlock(context, { position, height: customHeight });

        expect(customBlock.height).toBe(customHeight);
    });
});
