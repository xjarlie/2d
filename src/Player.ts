import Entity from "./Entity";
import { keyPressed } from "./lib/keyMap";
import { EntityGroup, milliseconds } from "./lib/types";
import { Vector } from "./Vector";
import global from "./lib/global";
import { ticks } from "./tick";
import { getCollisionsBetween } from "./lib/collisions";
import { getByGroup } from "./lib/getPhysicsObject";
import Camera from "./Camera";

class Player extends Entity {

    movementForce: number;
    jumpForce: number;

    constructor(posX: number, posY: number) {
        super(posX, posY, 50, 50);

        this.movementForce = 2_500_000_0;
        this.jumpForce = 400_000_000;
        this.density = 1;

        this.group = EntityGroup.Player;
    }

    tick(deltaTime: milliseconds) {
        const camera: Camera = global.camera;
        camera.setCenter(this.position, true, false);

        if (keyPressed("d")) {
            this.applyForce(Vector.fromPolar(this.movementForce, 0));
        }

        if (keyPressed("a")) {
            this.applyForce(Vector.fromPolar(this.movementForce, Math.PI));
        }

        if (keyPressed("s")) {
            this.applyForce(Vector.fromPolar(this.movementForce, Math.PI * 0.5))
        }

        if (keyPressed("w") /* && getCollisionsBetween(this, [...getByGroup(EntityGroup.Box), ...getByGroup(EntityGroup.Ground)]).length > 0 */) {
            //this.applyForce(Vector.fromPolar(this.jumpForce, Math.PI * 1.5));
            this.applyForce(Vector.fromPolar(this.movementForce, Math.PI * 1.5));
        }

        super.tick(deltaTime);
        // console.log(this.acceleration.y, Math.round(this.velocity.y));
    }
}

export default Player;