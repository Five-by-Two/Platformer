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
import { EPlayerState } from '../../Enums';

export const initializeAnimations = () => ({
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
});
