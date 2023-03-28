import { Vector } from "./Vector";
import global from "./lib/global";
import { EntityGroup, milliseconds } from "./lib/types";
import { ticks } from "./tick";
import { nextID } from "./lib/getEntities";
import { Collision } from "./lib/collisions";

class Entity {

    position: Vector;
    size: Vector;
    velocity: Vector;
    force: Vector;
    acceleration: Vector;
    gravity: boolean;
    density: number;
    color: string;
    drag: number;


    id: number;
    group: EntityGroup;

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
        
        this.group = EntityGroup.Default;
        this.id = -1;

    }

    // get acceleration(): Vector {
    //     return new Vector(this.force.x / this.mass, this.force.y / this.mass);
    // }

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

    draw() {

        const ctx = global.ctx as CanvasRenderingContext2D;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

    }

    tick(deltaTime: milliseconds) {

        //console.log(this.acceleration);

        // apply gravity
        if (this.gravity) this.acceleration.y += global.gravity;

        const deltaTimeS = deltaTime / 1000;

        // apply air resistance
        const airRes = new Vector(0,0);
        airRes.x = -0.5 * global.airConstant * (this.size.y/1) * Math.pow(this.velocity.x, 2) * Math.sign(this.velocity.x);
        airRes.y = -0.5 * global.airConstant * (this.size.x/1) * Math.pow(this.velocity.y, 2) * Math.sign(this.velocity.y);
        
        this.force = Vector.sum(this.force, airRes);

        // apply acceleration a = f/m
        this.acceleration = Vector.sum(this.acceleration, Vector.divide(this.force, this.mass));
        // this.acceleration.x += 1;
        // this.acceleration.y += 1;

        // apply velocity & position
        // v = u + at
        this.velocity = Vector.sum(this.velocity, Vector.multiply(this.acceleration, deltaTimeS));


        this.position = Vector.sum(this.position, Vector.multiply(this.velocity, deltaTimeS));

        const entities: Entity[] = global.entities;
        const collisions = this.collidingMultiple(...entities);
        if (collisions.length > 0) {
            this.color = 'red';
        } else {
            this.color = 'white';
        }

        // for (const o of collisions) {
        //     this.force.subtract(o.force);
        //     o.force.add(this.force);
        // }

        this.force = new Vector();
        this.acceleration = new Vector();
    }

    add() {
        this.id = nextID();
        global.entities.push(this);
    }

    // Needs to return a collision vector rather than boolean
    // describing direction, magnitude etc
    collidingWith(entity: Entity): boolean {

        const a = this;
        const b = entity;

        return !(
            ((a.position.y + a.size.y) < (b.position.y)) ||
            (a.position.y > (b.position.y + b.size.y)) ||
            ((a.position.x + a.size.x) < b.position.x) ||
            (a.position.x > (b.position.x + b.size.x))
        );
    }

    collidingMultiple(...entities: Entity[]): Entity[] {

        const colliding: Entity[] = [];

        for (const o of entities) {

            if (o.id === this.id) continue;

            if (this.collidingWith(o)) {
                colliding.push(o);
            }

        }

        return colliding;
    }

    static areColliding(a: Entity, b: Entity): boolean {
        return !(
            ((a.position.y + a.size.y) < (b.position.y)) ||
            (a.position.y > (b.position.y + b.size.y)) ||
            ((a.position.x + a.size.x) < b.position.x) ||
            (a.position.x > (b.position.x + b.size.x))
        );
    }

    static getCollisionBetween(a: Entity, b: Entity): Collision {
        if (!Entity.areColliding(a, b)) {}
    }
}

export default Entity;