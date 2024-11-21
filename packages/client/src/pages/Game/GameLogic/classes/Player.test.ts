import { Player } from './Player';
import { ICoordinates } from '../../models';
import { CollisionBlock } from './CollisionBlock';
import idleImage from '../assets/warrior/Idle.png';
import runImage from '../assets/warrior/Run.png';

describe('Player', () => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let player: Player;
    let velocity: ICoordinates;
    let position: ICoordinates;
    let collisionBlocks: CollisionBlock[];
    let platformCollisionBlocks: CollisionBlock[];
    let animations: Record<string, { imageSrc: string; frameRate: number; image: HTMLImageElement; frameBuffer: number }>;
    
    beforeEach(() => {
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d') as CanvasRenderingContext2D;
        
        position = { x: 100, y: 100 };
        velocity = { x: 0, y: 0 };
        
        collisionBlocks = [
            new CollisionBlock(context, { position: { x: 100, y: 100 }})
        ];
        platformCollisionBlocks = [];
        
        animations = {
            idle: { imageSrc: idleImage, frameRate: 1, image: new Image(), frameBuffer: 3 },
            run: { imageSrc: runImage, frameRate: 1, image: new Image(), frameBuffer: 3 },
        };
        
        // Инициализируем игрока
        player = new Player({
            canvas,
            context,
            position,
            velocity,
            collisionBlocks,
            platformCollisionBlocks,
            imgSrc: idleImage,
            animations
        });
    });
    
    it('should initialize with correct properties', () => {
        expect(player.position).toEqual(position);
        expect(player.velocity).toEqual({ x: 0, y: 1 });
        expect(player.collisionBlocks).toEqual(collisionBlocks);
        expect(player.platformCollisionBlocks).toEqual(platformCollisionBlocks);
        expect(player.animations).toEqual(animations);
        expect(player.hitbox).toEqual({
            position: { x: position.x, y: position.y },
            width: 10,
            height: 10,
        });
        expect(player.cameraBox).toEqual({
            position: { x: position.x, y: position.y },
            width: 200,
            height: 80,
        });
    });
    
    it('should switch sprites correctly', () => {
        player.switchSprite('run');
        expect(player.frameBuffer).toBe(animations.run.frameBuffer);
        expect(player.frameRate).toBe(animations.run.frameRate);
    });
    
    it('should update camera box correctly', () => {
        player.updateCameraBox();
        expect(player.cameraBox.position.x).toBe(player.position.x - 60);
        expect(player.cameraBox.position.y).toBe(player.position.y);
    });
    
    it('should check for horizontal canvas collision', () => {
        player.velocity.x = 1500;
        player.checkForHorizontalCanvasCollision();
        expect(player.velocity.x).toBe(0);
    });
    
    it('should pan camera correctly to the right', () => {
        const camera = { position: { x: 0, y: 0 } };
        player.shouldPanCameraToTheRight(camera);
        expect(camera.position.x).toBe(0);
    });
    
    it('should apply gravity correctly', () => {
        const initialY = player.position.y;
        player.applyGravity();
        expect(player.position.y).toBeGreaterThan(initialY);
        expect(player.velocity.y).toBeGreaterThan(0);
    });
    
    it('should check for vertical collisions', () => {
        player.velocity.y = 1;
        player.checkForVerticalCollisions();
        expect(player.velocity.y).toBe(0);
    });
    
    it('should update player position and hitbox', () => {
        player.update();
        expect(player.position.x).toBeGreaterThan(50);
        expect(player.hitbox.position).toEqual({
            x: player.position.x + 35,
            y: player.position.y + 26,
        });
    });
});
