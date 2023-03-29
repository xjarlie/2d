import Entity from "./Entity";
import { keyPressed } from "./lib/keyMap";
import { EntityGroup, milliseconds } from "./lib/types";
import { Vector } from "./Vector";
import global from "./lib/global";
import { ticks } from "./tick";
import { getCollisionsBetween } from "./lib/collisions";
import { getByGroup } from "./lib/getPhysicsObject";
import Camera from "./Camera";
import Bullet from "./Bullet";

class Player extends Entity {

    movementForce: number;
    jumpForce: number;
    direction: number;

    constructor(posX: number, posY: number) {
        super(posX, posY, 50, 50);

        this.movementForce = 2_500_000_0;
        this.jumpForce = 400_000_000;
        this.density = 1;
        this.direction = 0;

        this.group = EntityGroup.Player;
    }

    tick(deltaTime: milliseconds) {
        const camera: Camera = global.camera;
        //camera.setCenter(this.position, true, true);
        camera.glide(this.center, 20, 40, true, true);

        if (keyPressed("d")) {
            this.direction = 0;
            this.applyForce(Vector.fromPolar(this.movementForce, this.direction));
        }

        if (keyPressed("a")) {
            this.direction = Math.PI;
            this.applyForce(Vector.fromPolar(this.movementForce, this.direction));
        }

        if (keyPressed("s")) {
            this.direction = Math.PI * 0.5;
            this.applyForce(Vector.fromPolar(this.movementForce, this.direction))
        }

        if (keyPressed("w") /* && getCollisionsBetween(this, [...getByGroup(EntityGroup.Box), ...getByGroup(EntityGroup.Ground)]).length > 0 */) {
            //this.applyForce(Vector.fromPolar(this.jumpForce, Math.PI * 1.5));
            this.direction = Math.PI * 1.5;
            this.applyForce(Vector.fromPolar(this.movementForce, this.direction));
        }

        if (keyPressed(" ")) {
            const bullet = new Bullet(this.center.x, this.center.y, Vector.fromPolar(100, this.direction));
            bullet.add();
        }

        super.tick(deltaTime);
        // console.log(this.acceleration.y, Math.round(this.velocity.y));
    }
}

export default Player;