import Entity from "../lib/Entity";
import { keyPressed } from "../lib/keyMap";
import { CollisionType, EntityGroup, milliseconds } from "../lib/types";
import { Vector } from "../lib/Vector";
import global from "../lib/global";
import { ticks } from "../lib/tick";
import { getCollisionsBetween } from "../lib/collisions";
import { getByGroup } from "../lib/getEntities";
import Camera from "../lib//Camera";
import Bullet from "./Bullet";
import Graphics, { GraphicsType, Sprite, SpriteAnimation } from "../lib/Graphics";

class Player extends Entity {

    movementForce: number;
    jumpForce: number;
    direction: number;

    lastFired: number;
    fireDelay: number;

    constructor(posX: number, posY: number) {
        super(posX, posY, 50, 50);

        this.movementForce = 20_000_000;
        this.jumpForce = 400_000_000;
        this.density = 1;
        this.direction = 0;

        this.lastFired = 0;
        this.fireDelay = 100;

        this.groups.push(EntityGroup.Player);

        this.graphics = new Graphics(this, GraphicsType.Image);
        const mainSprite = new Sprite("img/itsame.jpg", "itsame", "fit");
        const pixelatedMario = new Sprite("img/mariosquare.png", "pixel", "fit");

        const animation = new SpriteAnimation([
            {
                sprite: mainSprite,
                duration: 100,
                delayAfter: 0
            },
            {
                sprite: pixelatedMario,
                duration: 10,
                delayAfter: 0
            }
        ]);

        this.graphics.animation = animation;
        this.graphics.currentSprite = mainSprite;
    }

    tick(deltaTime: milliseconds) {
        const camera: Camera = global.camera;
        // camera.setCenter(this.position, true, true);
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

        if (keyPressed("w")) {

            const accCollisions = getCollisionsBetween(this, getByGroup(EntityGroup.Box, EntityGroup.Ground));
            if (accCollisions.some(o => o.type = CollisionType.Bottom)) {
                this.direction = Math.PI * 1.5;
                this.applyForce(Vector.fromPolar(this.jumpForce, this.direction));
            }

        }

        if (keyPressed(" ")) {

            if (ticks > this.lastFired + this.fireDelay) {
                const bullet = new Bullet(this.center.x + this.size.x, this.center.y, Vector.fromPolar(200_000_000_000_000, this.direction));
                bullet.add();
                this.lastFired = ticks;
            }

        }

        super.tick(deltaTime);
        // console.log(this.acceleration.y, Math.round(this.velocity.y));
    }
}

export default Player;