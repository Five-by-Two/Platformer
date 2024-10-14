import { EPlayerState } from '../../Enums';
import { Player } from '../classes/Player';
import { initializeCollisions } from './initializeCollisions';
import {
    WarriorFall,
    WarriorFallLeft,
    WarriorIdle,
    WarriorIdleLeft,
    WarriorJump,
    WarriorJumpLeft,
    WarriorRun,
    WarriorRunLeft,
    WarriorAttack,
    WarriorAttackLeft,
} from '../configs/playerConfig';

export function initializePlayers(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const { collisionBlocks, platformCollisionBlocks } = initializeCollisions(context);

    return new Player({
        context,
        velocity: {
            x: 4,
            y: 4,
        },
        scale: 0.5,
        canvas,
        imgSrc: WarriorIdle,
        position: {
            x: 100,
            y: 300,
        },
        collisionBlocks,
        platformCollisionBlocks,
        frameRate: 8,
        animations: {
            [EPlayerState.Idle]: {
                imageSrc: WarriorIdle,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.IdleLeft]: {
                imageSrc: WarriorIdleLeft,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.Run]: {
                imageSrc: WarriorRun,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.RunLeft]: {
                imageSrc: WarriorRunLeft,
                image: new Image(),
                frameRate: 8,
                frameBuffer: 8,
            },
            [EPlayerState.Jump]: {
                imageSrc: WarriorJump,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            [EPlayerState.JumpLeft]: {
                imageSrc: WarriorJumpLeft,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            [EPlayerState.Fall]: {
                imageSrc: WarriorFall,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            [EPlayerState.FallLeft]: {
                imageSrc: WarriorFallLeft,
                image: new Image(),
                frameRate: 2,
                frameBuffer: 2,
            },
            [EPlayerState.Attack]: {
                imageSrc: WarriorAttack,
                image: new Image(),
                frameRate: 4,
                frameBuffer: 4,
            },
            [EPlayerState.AttackLeft]: {
                imageSrc: WarriorAttackLeft,
                image: new Image(),
                frameRate: 4,
                frameBuffer: 4,
            },
        },
    });
}
