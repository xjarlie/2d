import Entity from "./Entity";
import { keyPressed } from "./lib/keyMap";
import { EntityGroup, milliseconds } from "./lib/types";
import { Vector } from "./Vector";
import global from "./lib/global";
import { ticks } from "./tick";

class Player extends Entity {

    movementForce: number;

    constructor(posX: number, posY: number) {
        super(posX, posY, 50, 50);

        this.movementForce = 2_500_000;
        this.density = 1;

        this.group = EntityGroup.Player;
    }

    tick(deltaTime: milliseconds) {
        super.tick(deltaTime);

        if (keyPressed("d")) {
            this.applyForce(Vector.fromPolar(this.movementForce, 0));
        }

        if (keyPressed("a")) {
            this.applyForce(Vector.fromPolar(this.movementForce, Math.PI));
        }

        if (keyPressed("s")) {
            this.applyForce(Vector.fromPolar(this.movementForce, Math.PI * 0.5))
        }

        if (keyPressed("w")) {
            this.applyForce(Vector.fromPolar(this.movementForce, Math.PI * 1.5));
        }
        console.log(ticks, global.entities);
    }
}

export default Player;