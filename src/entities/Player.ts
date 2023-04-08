import Entity from "../lib/Entity";
import { keyPressed } from "../lib/keyMap";
import { CollisionType, EntityGroup, milliseconds } from "../lib/types";
import { Vector } from "../lib/Vector";
import { ticks } from "../lib/tick";
import { getCollisionsBetween } from "../lib/collisions";
import { getByGroup } from "../lib/getEntities";
import Camera from "../modules/Camera";
import Bullet from "./Bullet";
import Graphics, { GraphicsType, Sprite, SpriteAnimation, SpriteSheet } from "../modules/Graphics";
import { engine } from "..";

class Player extends Entity {

    movementForce: number;
    jumpForce: number;
    direction: number;

    lastFired: number;
    fireDelay: number;

    animations: SpriteAnimation[];

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
        this.animations = [];

        function piskelCallback(sheet: SpriteSheet) {
            this.animations[0] = SpriteAnimation.fromSpriteSheet(sheet, 5);
            this.graphics.type = GraphicsType.Image;
            this.graphics.animation = this.animations[0];
        }
        const piskelSheet = new SpriteSheet("img/piskel-sheet.png", "piskelsheet", new Vector(32, 32), [], piskelCallback.bind(this));

        function pacmanCallback(sheet: SpriteSheet) {
            this.animations[1] = SpriteAnimation.fromSpriteSheet(sheet, 10);
        }
        const pacmanSheet = new SpriteSheet("img/pacman-spritesheet.png", "pacmansheet", new Vector(28.4, 46), [], pacmanCallback.bind(this));
        

    }

    tick(deltaTime: milliseconds) {
        const camera = engine.camera as Camera;
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
                engine.add(bullet);
                this.lastFired = ticks;
                
            }

        }

        if (keyPressed("h")) {
            this.graphics.animation = this.animations[1];
        } else {
            this.graphics.animation = this.animations[0];
        }

        super.tick(deltaTime);
        // console.log(this.acceleration.y, Math.round(this.velocity.y));
    }
}

export default Player;