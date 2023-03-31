import Entity from "./lib/Entity";
import { nextID } from "./lib/getEntities";
import { EntityGroup } from "./lib/types";
import { Vector } from "./lib/Vector";
import global from "./lib/global";
import { Collision } from "./lib/collisions";

class Composite  {
    cPos: Vector;

    id: number;
    group: EntityGroup;
    mass: number;
    static: boolean;
    
    entities: Entity[];
    
    constructor(posX: number = 0, posY: number = 0, entities: Entity[]) {

        this.cPos = new Vector(posX, posY);

        this.entities = entities;
        this.group = EntityGroup.Default;
        this.static = false;
    }

    set position(position: Vector) {

        const transformation = Vector.subtract(position, this.cPos);

        for (const o of this.entities) {
            o.position = Vector.sum(o.position, transformation);
        }

        this.cPos = position;
    }

    get position(): Vector {
        return this.cPos;
    }

    set velocity(velocity: Vector) {
        for (const o of this.entities) {
            o.velocity = velocity;
        }
    }

    tick(deltaTime: DOMHighResTimeStamp) {
        for (const o of this.entities) {
            o.tick(deltaTime);
        }
    }

    draw(position: Vector) {
        for (const o of this.entities) {
            o.draw(position);
        }
    }

    add() {
        this.id = nextID();
        
        global.entities.push(this);
    }

    isCollidingWith(bs: Entity[]): boolean {
        return false;
    }

    getCollisionWith(b: Entity): Collision {
        return new Collision(b, b); // Temporary
    }

}

export default Composite;