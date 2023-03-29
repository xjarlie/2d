import { Vector } from "./Vector";
import global from "./lib/global";
import { CollisionType, EntityGroup, milliseconds } from "./lib/types";
import { ticks } from "./tick";
import { getByGroup, nextID } from "./lib/getEntities";
import { Collision, getCollisions, getCollisionsBetween } from "./lib/collisions";
import { PhysicsObject } from "./lib/types";
import Composite from "./Composite";

class Entity implements PhysicsObject {

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

    // Only for internal use
    isCollidingWith(bs: Entity[]) {
        let colliding = false;

        const a = this;

        for (const b of bs) {

            if (b.id === a.id) continue;

            if (!(
                ((a.position.y + a.size.y) < (b.position.y)) ||
                (a.position.y > (b.position.y + b.size.y)) ||
                ((a.position.x + a.size.x) < b.position.x) ||
                (a.position.x > (b.position.x + b.size.x))
            )) {
                colliding = true;
                break;
            }
        }

        return colliding;
    }

    getCollisionWith(b: Entity) {
        const a = this;
        if (!this.isCollidingWith([b])) return null;

        const collision = new Collision(a, b);

        const vDiff = Vector.subtract(a.velocity, b.velocity);
        collision.velocity = vDiff;

        // Get collision depth vector
        const pDiff = Vector.subtract(a.center, b.center);
        const minDiff = new Vector(a.size.x / 2 + b.size.x / 2, a.size.y / 2 + b.size.y / 2);
        const depthX = pDiff.x > 0 ? minDiff.x - pDiff.x : -minDiff.x - pDiff.x;
        const depthY = pDiff.y > 0 ? minDiff.y - pDiff.y : -minDiff.y - pDiff.y;
        const depth = new Vector(depthX, depthY);
        collision.depth = depth;

        if (Math.abs(depth.x) < Math.abs(depth.y)) {
            if (depth.x > 0) {
                // Left
                collision.type = CollisionType.Left;
            } else {
                // Right
                collision.type = CollisionType.Right;
            }
        } else {
            if (depth.y > 0) {
                // Top
                collision.type = CollisionType.Top;
            } else {
                // Bottom
                collision.type = CollisionType.Bottom;
            }
        }

        const fDiff = Vector.subtract(a.force, b.force);
        collision.force = fDiff;

        // temporary: need to check collision depth
        return collision;
    }
}

export default Entity;