import Camera from "./Camera";
import Entity from "./Entity";
import { Vector } from "./Vector";
import { getById } from "./getEntities";
import global from "./global";
import { CollisionType, EntityGroup } from "./types";

let collisions: Collision[] = [];

function updateCollisions() {
    // update collision array
    // called every tick

    collisions = [];

    const entities: Entity[] = global.entities;

    // loop through all entities, and check for box collisions
    for (const current of entities) {

        const currentMask: EntityGroup[] = current.collisionMask;
        if (currentMask.length === 0) continue;

        const isColliding: Entity[] = current.getColliding(entities);

        // check every other entity for collisions
        for (const other of isColliding) {
            if (other.id === current.id) continue;
            
            const otherMask: EntityGroup[] = other.collisionMask;
            if (otherMask.length === 0) continue;

            if (!(currentMask.some(r => other.groups.includes(r)) && otherMask.some(r => current.groups.includes(r)))) continue;

            // Performance is terrible - O(n^2) i think bc nested loop
            // KD Trees? idk what they are but might work https://www.baeldung.com/cs/k-d-trees

            // then, specific collision
            const collision: Collision = current.getCollisionWith(other, false);
            if (collision !== null) {

                // check if collision already exists but reversed
                const duplicates: boolean = collisions.some((o) => {
                    return (o.bodyA.id === collision.bodyB.id && o.bodyB.id === collision.bodyA.id) || (o.bodyA.id === collision.bodyA.id && o.bodyB.id === collision.bodyB.id);
                });

                if (!duplicates) {
                    collisions.push(collision);
                }
            }


        }
    }
}

function setCollisions(c: Collision[]) {
    collisions = c;
}

function getAllCollisions(): Collision[] {
    return collisions;
}


function getCollisions(target: Entity): Collision[] {
    return collisions.filter((o) => o.bodyA.id === target.id || o.bodyB.id === target.id)
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
    velocity: Vector;
    depth: Vector;
    bodyA: Entity;
    bodyB: Entity;
    type: CollisionType;
    force: Vector;

    constructor(a: Entity, b: Entity, x: number = 0, y: number = 0) {
        this.bodyA = a;
        this.bodyB = b;
        this.velocity = new Vector(x, y);
    }
}

function resetCollisions() {
    collisions = [];
}

export { Collision, getCollisions, updateCollisions, getCollisionsBetween, resetCollisions, setCollisions, getAllCollisions }