import Entity from "../Entity";
import { Vector } from "../Vector";
import global from "./global";

let collisions: Collision[] = [];

function handleCollisions() {
    // update collision array
    // called every tick

    collisions = [];

    const entities: Entity[] = global.entities;

    // loop through all entities, and check for box collisions
    for (const current of entities) {

        // check every other entity for collisions
        for (const other of entities) {
            if (other === current) continue;

            // first, check that they are nearby each other for performance


            // then, specific collision
            const collision = Entity.getCollisionBetween(current, other);
            if (collision !== null) {

                // check if collision already exists but reversed
                const duplicates = collisions.filter((o) => {
                    return (o.bodyA.id === collision.bodyB.id && o.bodyB.id === collision.bodyA.id) || (o.bodyA.id === collision.bodyA.id && o.bodyB.id === collision.bodyB.id); 
                })

                if (duplicates.length === 0) {
                    collisions.push(collision);
                }
            }
        }
    }
}

function getCollisions(target: Entity): Collision[] {
    return collisions.filter((o) => o.bodyA === target || o.bodyB === target)
}

function getCollisionsBetween(target: Entity, bs: Entity[]): Collision[] {

    return collisions.filter((o) => {
        let result = false;
        for (const b of bs) {
            if ((o.bodyA.id === b.id && o.bodyB.id === target.id) || (o.bodyB.id === b.id && o.bodyA.id === target.id)) {
                result = true;
            }
        }
        return result;
    });
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

export { Collision, getCollisions, handleCollisions, getCollisionsBetween }