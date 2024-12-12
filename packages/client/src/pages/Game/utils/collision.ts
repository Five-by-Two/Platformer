import { CollisionBlock } from '../GameLogic/classes/CollisionBlock';
import { IHitBox } from '../GameLogic/classes/Player';
import { PlatformBlock } from '@/pages/Game/GameLogic/classes/PlatformBlock';

export function collision(object1: IHitBox, object2: CollisionBlock) {
    return (
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    );
}

export function platformCollision(object1: IHitBox, object2: PlatformBlock) {
    return (
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y + object1.height <= object2.position.y + object2.tileSize &&
        object1.position.x <= object2.position.x + object2.tileSize &&
        object1.position.x + object1.width >= object2.position.x
    );
}
