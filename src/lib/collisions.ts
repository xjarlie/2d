import Camera from "./Camera";
import Entity from "./Entity";
import { Vector } from "./Vector";
import { getById } from "./getEntities";
import global from "./global";
import { CollisionType, EntityGroup } from "./types";

let collisions: Collision[] = [];

function handleCollisions() {
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




    // Handle collision physics

    for (const collision of collisions) {

        const a = getById(collision.bodyA.id);
        const b = getById(collision.bodyB.id);

        const totalMass = a.mass + b.mass;
        const massAMinusBOverTotal = (a.mass - b.mass) / totalMass;
        const massBMinusAOverTotal = (b.mass - a.mass) / totalMass;
        const massATimes2OverTotal = (2 * a.mass) / totalMass;
        const massBTimes2OverTotal = (2 * b.mass) / totalMass;

        // a.acceleration = Vector.sum(a.acceleration, transformation.negative());
        // b.acceleration = Vector.sum(b.acceleration, transformation);

        // console.log(a.force, b.force);
        // a.applyForce(a.force.negative());
        // b.applyForce(b.force.negative());
        // console.log(a.force, b.force);

        // a.velocity = Vector.sum(a.velocity, transformation.negative());
        // b.velocity = Vector.sum(b.velocity, transformation);

        const depth = collision.depth;

        if (Math.abs(depth.x) < Math.abs(depth.y)) {
            // Collision along X axis

            // v1 = u1(m1 - m2) / (m1 + m2) + u2(2m2) / (m1 + m2)
            // v2 = u2(m2 - m1) / (m1 + m2) + u1(2m1) / (m1 + m2)



            // const v1 = (a.velocity.x * (a.mass - b.mass)) / totalMass + (b.velocity.x * (2 * b.mass)) / totalMass;
            // const v2 = (b.velocity.x * (b.mass - a.mass)) / totalMass + (a.velocity.x * (2 * a.mass)) / totalMass;

            const v1 = (a.velocity.x * massAMinusBOverTotal) + (b.velocity.x * massBTimes2OverTotal);
            const v2 = (b.velocity.x * massBMinusAOverTotal) + (a.velocity.x * massATimes2OverTotal);


            if (!a.static) a.velocity.x = v1;
            if (!b.static) b.velocity.x = v2;

            if (!a.static) a.position.x += depth.x;
            if (!b.static) b.position.x -= depth.x;



            // if (!a.static) {
            //     a.position.x += Math.round(depth.x);
            //     //a.velocity.x -= combinedM / a.mass;
            //     a.velocity.x -= collision.velocity.x;
            // }
            // if (!b.static) {
            //     b.position.x -= Math.floor(depth.x);
            //     //b.velocity.x += combinedM / b.mass;
            //     b.velocity.x += collision.velocity.x;
            // }


        } else {
            // Collision along Y axis

            // if (!a.static) {
            //     a.position.y += Math.round(depth.y);
            //     //a.velocity.y -= combinedM / a.mass;
            //     a.velocity.y -= collision.velocity.y;
            // }
            // if (!b.static) {
            //     b.position.y -= Math.round(depth.y);
            //     //b.velocity.y += combinedM / b.mass;
            //     b.velocity.y += collision.velocity.y
            // }

            // const v1 = (a.velocity.y * (a.mass - b.mass)) / totalMass + (b.velocity.y * (2 * b.mass)) / totalMass;
            // const v2 = (b.velocity.y * (b.mass - a.mass)) / totalMass + (a.velocity.y * (2 * a.mass)) / totalMass;

            const v1 = (a.velocity.y * massAMinusBOverTotal) + (b.velocity.y * massBTimes2OverTotal);
            const v2 = (b.velocity.y * massBMinusAOverTotal) + (a.velocity.y * massATimes2OverTotal);

            if (!a.static) a.velocity.y = v1;
            if (!b.static) b.velocity.y = v2;

            if (!a.static) a.position.y += depth.y;
            if (!b.static) b.position.y -= depth.y;

        }

        // const posTranslate = Vector.multiply(Vector.sign(a.velocity), 2);
        // a.position = Vector.sum(a.position, posTranslate.negative());

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

export { Collision, getCollisions, handleCollisions, getCollisionsBetween, resetCollisions, setCollisions, getAllCollisions }