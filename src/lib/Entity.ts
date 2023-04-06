import { Vector } from "./Vector";
import global from "./global";
import { CollisionType, EntityGroup, milliseconds } from "./types";
import { ticks } from "./tick";
import { getByGroup, nextID } from "./getEntities";
import { Collision, getCollisions, getCollisionsBetween } from "./collisions";
import Composite from "../Composite";
import Bounds from "./Bounds";
import Graphics, { GraphicsType } from "../modules/Graphics";

class Entity {

    cornerPos: Vector;
    center: Vector;
    size: Vector;
    velocity: Vector;
    force: Vector;
    acceleration: Vector;
    hasGravity: boolean;
    density: number;
    color: string;
    drag: number;
    maxSpeed: number;
    static: boolean;
    friction: number;

    id: number;
    groups: EntityGroup[];

    collisionMask: EntityGroup[];

    bounds: Bounds;
    graphics: Graphics;

    constructor(posX: number = 0, posY: number = 0, sizeX: number = 50, sizeY: number = 50) {
        this.size = new Vector(sizeX, sizeY);
        this.position = new Vector(posX, posY);
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.density = 1;
        this.color = '#fff';
        this.hasGravity = true;
        this.drag = 0.1;
        this.force = new Vector();
        this.maxSpeed = -1;
        this.static = false;
        this.friction = 0.05;

        this.groups = [EntityGroup.Default];
        this.id = -1;
        this.collisionMask = [EntityGroup.Default];

        this.bounds = new Bounds(
            this,
            this.position,
            Vector.sum(this.position, new Vector(this.size.x, 0)),
            Vector.sum(this.position, this.size),
            Vector.sum(this.position, new Vector(0, this.size.y))
        );

        this.graphics = new Graphics(this, GraphicsType.Rectangle);

    }

    get position(): Vector {
        return this.cornerPos;
    }

    set position(p: Vector) {
        this.cornerPos = p;
        this.center = new Vector(p.x + this.size.x / 2, this.position.y + this.size.y / 2)
    } 

    get area(): number {
        return this.size.x * this.size.y;
    }

    get mass(): number {
        return this.area * this.density;
    }

    applyForce(f: Vector) {
        // this.acceleration = Vector.sum(this.acceleration, Vector.divide(f, this.mass));
        this.force = Vector.sum(this.force, f);
    }

    // draw(position = this.position) {

    //     const ctx = global.ctx as CanvasRenderingContext2D;

    //     ctx.fillStyle = this.color;
    //     ctx.fillRect(position.x, position.y, this.size.x, this.size.y);

    // }

    draw(center: Vector = this.center, scale: number = this.graphics.scale) {
        this.graphics.draw(center, scale);
    }

    tick(deltaTime: milliseconds) {
        //console.log(this.acceleration);

        const deltaTimeS = deltaTime / 1000;

        if (!this.static) {

            // apply acceleration a = f/m
            this.acceleration = Vector.sum(this.acceleration, Vector.divide(this.force, this.mass));
            // this.acceleration.x += 1;
            // this.acceleration.y += 1;

            // apply velocity & position
            // v = u + at
            this.velocity = Vector.sum(this.velocity, Vector.multiply(this.acceleration, deltaTimeS));

            this.position = Vector.sum(this.position, Vector.multiply(this.velocity, deltaTimeS));

            this.bounds.updatePosition(this.center);
        }
    }

    async add() {
        this.id = nextID();
        global.entities.push(this);
    }

    // Only for internal use
    isCollidingWith(bs: Entity[]) {
        let colliding = false;

        for (const b of bs) {

            if (b.id === this.id) continue;

            if (this.bounds.isCollidingWith(b.bounds)) {
                colliding = true;
                break;
            }
        }

        return colliding;
    }

    getColliding(bs: Entity[]): Entity[] {
        const colliding: Entity[] = [];

        for (const b of bs) {
            if (b.id === this.id) continue;

            if (this.bounds.isCollidingWith(b.bounds)) {
                colliding.push(b);
            }
        }

        return colliding;
    }

    getCollisionWith(b: Entity, needsCheck: boolean = true): Collision {
        const collision = this.bounds.getCollisionWith(b.bounds, needsCheck);

        const vDiff = Vector.subtract(this.velocity, b.velocity);
        collision.velocity = vDiff;

        const fDiff = Vector.subtract(this.force, b.force);
        collision.force = fDiff;

        return collision;
    }
}

export default Entity;