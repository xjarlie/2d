import Entity from "../Entity";
import { Vector } from "../Vector";
import global from "./global";

const collisions: Collision[] = [];

function handleCollisions() {
    // update collision array
    // called every tick

    collisions.length = 0;

    const entities: Entity[] = global.entities;

    // loop through all entities, and check for box collisions
    for (const o of entities) {
        const current = o;

        // check every other entity for collisions
        for (const p of entities) {
            if (p === o) continue;

            // first, check that they are nearby each other for performance


            // then, specific collision
            const collision = Entity.getCollisionBetween(o, p);
            if (collision !== null) {
                collisions.push(collision);
            }
        }
    }

}

function getCollisions(target: Entity): Collision[] {
    return collisions.filter((o) => o.bodyA === target || o.bodyB === target)
}

class Collision {
    vector: Vector;
    bodyA: Entity;
    bodyB: Entity;

    constructor(a: Entity, b: Entity, x: number = 0, y: number = 0) {
        this.bodyA = a;
        this.bodyB = b;
        this.vector = new Vector(x, y);
    }
}

export { Collision, getCollisions, handleCollisions }