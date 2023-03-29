import Entity from "./Entity";
import { Vector } from "./Vector";

class Bullet extends Entity {

    firedVelocity: Vector;

    constructor(posX: number, posY: number, velocity: Vector) {
        super(posX, posY, 20, 30);

        this.firedVelocity = velocity;
    }

    tick() {
        this.velocity = this.firedVelocity;
    }

}

export default Bullet;