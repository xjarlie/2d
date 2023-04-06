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
import Graphics, { GraphicsType, Sprite, SpriteAnimation, SpriteSheet } from "../lib/Graphics";

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

        this.graphics = new Graphics(this, GraphicsType.Rectangle);

        function callback(sheet: SpriteSheet) {
            const piskelAnim = SpriteAnimation.fromSpriteSheet(sheet, 100);
            this.graphics.type = GraphicsType.Image;
            this.graphics.animation = piskelAnim;
        }
        const piskelSheet = new SpriteSheet("img/piskel-sheet.png", "piskelsheet", new Vector(32, 32), [], callback.bind(this));
        

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

            console.log('up pressed');

            const accCollisions = getCollisionsBetween(this, getByGroup(EntityGroup.Box, EntityGroup.Ground));
            console.log(accCollisions, accCollisions.filter(o => o.type === CollisionType.Bottom).length);
            if (accCollisions.some(o => o.type === CollisionType.Bottom)) {
                this.applyForce(new Vector(0, -this.jumpForce));
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