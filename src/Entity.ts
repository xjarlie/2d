import { Vector } from "./Vector";
import global from "./global";

class Entity {

    position: Vector;
    size: Vector;
    velocity: Vector;
    force: Vector;
    gravity: boolean;
    density: number;
    color: string;


    id: string;

    constructor(posX: number = 0, posY: number = 0, sizeX: number = 50, sizeY: number = 50) {
        
        this.position = new Vector(posX, posY);
        this.size = new Vector(sizeX, sizeY);
        this.velocity = new Vector();
        this.force = new Vector();
        this.density = 1;
        this.color = '#fff';
        this.gravity = true;
        

        this.id = crypto.randomUUID();

    }

    get acceleration(): Vector {
        return new Vector(this.force.x / this.mass, this.force.y / this.mass);
    }

    get area(): number {
        return this.size.x * this.size.y;
    }

    get mass(): number {
        return this.area * this.density;
    }

    draw() {

        const ctx = global.ctx as CanvasRenderingContext2D;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

    }

    tick() {

        // apply gravity
        if (this.gravity) this.force.y += global.gravity;


        this.velocity.add(this.acceleration);
        this.position.add(this.velocity, this.acceleration.multipliedBy(0.5));

        const entities: Entity[] = global.entities;
        const collisions = this.collidingMultiple(...entities);
        if (collisions.length > 0) {
            this.color = 'red';
        } else {
            this.color = 'white';
        }
        console.log(collisions);

        // for (const o of collisions) {
        //     this.force.subtract(o.force);
        //     o.force.add(this.force);
        // }
        
    }

    add() {
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
}

export default Entity;