import Entity from "../lib/Entity";
import { EntityGroup } from "../lib/types";

class Ground extends Entity {
    constructor(posX: number, posY: number, sizeX: number, sizeY: number) {
        super(posX, posY, sizeX, sizeY);

        this.gravity = false;
        this.groups.push(EntityGroup.Ground);
        this.static = true;
        //this.density = 100000;

        this.collisionMask = [EntityGroup.Default]
    }
}

export default Ground;