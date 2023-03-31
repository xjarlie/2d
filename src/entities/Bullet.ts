import { getAllCollisions, getCollisions } from "../lib/collisions";
import Entity from "../lib/Entity";
import { keyPressed } from "../lib/keyMap";
import { EntityGroup } from "../lib/types";
import { Vector } from "../lib/Vector";

class Bullet extends Entity {

    firedForce: Vector;
    isForceApplied: boolean;

    constructor(posX: number, posY: number, force: Vector) {
        super(posX, posY, 20, 20);

        this.firedForce = force;
        this.isForceApplied = false;
        this.gravity = false;

        this.collisionMask = [EntityGroup.Box];

    }

    tick(deltaTime: DOMHighResTimeStamp) {


        if (!this.isForceApplied) {
            this.applyForce(this.firedForce);
            this.isForceApplied = true;
            console.log(this.firedForce, this.force)
        }

        // if (keyPressed("h")) {
        //     this.applyForce(this.firedForce);
        //     console.log(this.force)
        // }

        super.tick(deltaTime);
    }

}

export default Bullet;