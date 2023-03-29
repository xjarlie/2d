import { Vector } from "./Vector";
import global from "./lib/global";
import { CollisionType, EntityGroup, milliseconds } from "./lib/types";
import { ticks } from "./tick";
import { getByGroup, nextID } from "./lib/getEntities";
import { Collision, getCollisions, getCollisionsBetween } from "./lib/collisions";
import { Renderable } from "./lib/types";
import Composite from "./Composite";

class Entity implements Renderable {

    position: Vector;
    size: Vector;
    velocity: Vector;
    force: Vector;
    acceleration: Vector;
    gravity: boolean;
    density: number;
    color: string;
    drag: number;
    maxSpeed: number;
    static: boolean;
    friction: number;

    id: number;
    group: EntityGroup;

    parentComposite?: Composite;

    constructor(posX: number = 0, posY: number = 0, sizeX: number = 50, sizeY: number = 50) {

        this.position = new Vector(posX, posY);
        this.size = new Vector(sizeX, sizeY);
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.density = 1;
        this.color = '#fff';
        this.gravity = true;
        this.drag = 0.1;
        this.force = new Vector();
        this.maxSpeed = -1;
        this.static = false;
        this.friction = 0.9;

        this.group = EntityGroup.Default;
        this.id = -1;

    }

    get area(): number {
        return this.size.x * this.size.y;
    }

    get mass(): number {
        return this.area * this.density;
    }

    get center(): Vector {
        const x = this.position.x + this.size.x / 2;
        const y = this.position.y + this.size.y / 2;
        return new Vector(x, y);
    }

    applyForce(f: Vector) {
        // this.acceleration = Vector.sum(this.acceleration, Vector.divide(f, this.mass));
        this.force = Vector.sum(this.force, f);
    }

    draw(position = this.position) {

        const ctx = global.ctx as CanvasRenderingContext2D;

        ctx.fillStyle = this.color;
        ctx.fillRect(position.x, position.y, this.size.x, this.size.y);

    }

    tick(deltaTime: milliseconds) {

        //console.log(this.acceleration);
        

        // apply gravity
        if (!this.static) {

            if (this.gravity) this.applyForce(new Vector(0, global.gravity * this.mass));

            const deltaTimeS = deltaTime / 1000;

            // apply air resistance
            const airRes = new Vector(0, 0);
            airRes.x = -0.5 * global.airConstant * (this.size.y / 1) * Math.pow(this.velocity.x, 2) * Math.sign(this.velocity.x);
            airRes.y = -0.5 * global.airConstant * (this.size.x / 1) * Math.pow(this.velocity.y, 2) * Math.sign(this.velocity.y);

            // apply friction
            const allCollisions = getCollisions(this);
            const friction = new Vector(0, 0);
            // F = mR
            for (const o of allCollisions) {
                const aFriction = o.bodyA.friction;
                const bFriction = o.bodyB.friction;

                const prodFriction = aFriction * bFriction;

                if (o.type === CollisionType.Bottom || o.type === CollisionType.Top) {
                    friction.x -= this.force.x * prodFriction;
                } else {
                    friction.y -= this.force.y * prodFriction;
                }
            }

            this.force = Vector.sum(this.force, airRes, friction);

            // apply acceleration a = f/m
            this.acceleration = Vector.sum(this.acceleration, Vector.divide(this.force, this.mass));
            // this.acceleration.x += 1;
            // this.acceleration.y += 1;

            // apply velocity & position
            // v = u + at
            this.velocity = Vector.sum(this.velocity, Vector.multiply(this.acceleration, deltaTimeS));

            this.position = Vector.sum(this.position, Vector.multiply(this.velocity, deltaTimeS));

        }
    }

    add() {
        this.id = nextID();
        global.entities.push(this);
    }
}

export default Entity;