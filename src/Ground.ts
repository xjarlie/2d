import Entity from "./Entity";
import { EntityGroup } from "./lib/types";

class Ground extends Entity {
    constructor(posX: number, posY: number, sizeX: number, sizeY: number) {
        super(posX, posY, sizeX, sizeY);

        this.gravity = false;
        this.group = EntityGroup.Ground;
        this.static = true;
        //this.density = 100000;
    }
}

export default Ground;