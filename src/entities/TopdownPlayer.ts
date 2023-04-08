import Entity from "../lib/Entity";
import { Vector } from "../lib/Vector";
import { keyPressed } from "../lib/keyMap";
import { EntityGroup } from "../lib/types";
import Graphics, { GraphicsType, Sprite, SpriteAnimation, SpriteSheet } from "../modules/Graphics";

class TopdownPlayer extends Entity {

    animations: SpriteAnimation[];
    direction: number;

    movementForce: number;

    constructor(posX: number, posY: number) {
        super(posX, posY, 32, 32);

        this.groups.push(EntityGroup.Player);
        this.animations = [];

        this.movementForce = 100;
        this.direction = 0;

        this.density = 1;

        function piskelCallback(sheet: SpriteSheet) {
            this.animations[0] = SpriteAnimation.fromSpriteSheet(sheet, 100);
            this.graphics.type = GraphicsType.Image;
            this.graphics.animation = this.animations[0];

            const sprite = sheet.getSprite(4);
            this.graphics.animation = null;
            this.graphics.currentSprite = sprite;
        }
        const piskelSheet = new SpriteSheet("img/piskel-sheet.png", "piskelsheet", new Vector(32, 32), [], piskelCallback.bind(this));

        
    }

    tick(deltaTime: DOMHighResTimeStamp) {
        if (keyPressed("d")) {
            this.direction = 0;
            // this.applyForce(Vector.fromPolar(this.movementForce, this.direction));
            this.acceleration = Vector.sum(this.velocity, Vector.fromPolar(this.movementForce, this.direction));
        }

        if (keyPressed("a")) {
            this.direction = Math.PI;
            // this.applyForce(Vector.fromPolar(this.movementForce, this.direction));
            this.acceleration = Vector.sum(this.velocity, Vector.fromPolar(this.movementForce, this.direction));

        }

        if (keyPressed("s")) {
            this.direction = Math.PI * 0.5;
            // this.applyForce(Vector.fromPolar(this.movementForce, this.direction))
            this.acceleration = Vector.sum(this.velocity, Vector.fromPolar(this.movementForce, this.direction));

        }

        if (keyPressed("w")) {
            this.direction = Math.PI * 1.5;
            // this.applyForce(Vector.fromPolar(this.movementForce, this.direction));
            this.acceleration = Vector.sum(this.velocity, Vector.fromPolar(this.movementForce, this.direction));

        }

        super.tick(deltaTime);
    }
}

export default TopdownPlayer;