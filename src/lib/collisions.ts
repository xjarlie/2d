import Entity from "../Entity";
import { Vector } from "../Vector";
import { getById } from "./getEntities";
import global from "./global";
import { CollisionType } from "./types";

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
            if (other.id === current.id) continue;

            // TODO: first, check that they are nearby each other for performance


            // then, specific collision
            const collision = getCollisionBetweenRaw(current, other);
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

    // Handle collision physics

    for (const collision of collisions) {

        const a = getById(collision.bodyA.id);
        const b = getById(collision.bodyB.id);

        const transformation = collision.velocity;

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
            if (depth.x > 0) {
                // Left side
                // console.log(collision, 'left collision', collision.bodyA)
            } else {
                // Right side
                // console.log(collision, 'right collision', collision.bodyA)
            }

            // calculate momentum
            const aMom = a.velocity.x * a.mass;
            const bMom = b.velocity.x * b.mass;


            const combinedM = (aMom + bMom) / 2;
            // if (!a.static) a.velocity.x -= combinedM / a.mass;
            // if (!b.static) b.velocity.x += combinedM / b.mass;

            // if (!a.static) a.position.x += depth.x;
            // if (!b.static) b.position.x -= depth.x;

            if (!a.static) {
                a.position.x += Math.round(depth.x);
                //a.velocity.x -= combinedM / a.mass;
                a.velocity.x -= collision.velocity.x;
            }
            if (!b.static) {
                b.position.x -= Math.floor(depth.x);
                //b.velocity.x += combinedM / b.mass;
                b.velocity.x += collision.velocity.x;
            }


        } else {
            // Collision along Y axis
            if (depth.y > 0) {
                // Top side
                // console.log(collision, 'top collision', collision.bodyA)
            } else {
                // Bottom side
                // console.log(collision, 'bottom collision', collision.bodyA)
            }

            // if (!a.static) {
            //     a.position.y += depth.y;
            //     a.velocity.y -= collision.velocity.y;
            // }
            // if (!b.static) {
            //     b.position.y -= depth.y;
            //     b.velocity.y += collision.velocity.y;
            // }
            // a.acceleration.y -= a.acceleration.y;

            // calculate momentum
            const aMom = a.velocity.y * a.mass;
            const bMom = b.velocity.y * b.mass;


            const combinedM = (aMom + bMom) / 2;

            // if (!a.static) a.velocity.y -= combinedM / a.mass;
            // if (!b.static) b.velocity.y += combinedM / b.mass;

            if (!a.static) {
                a.position.y += Math.round(depth.y);
                //a.velocity.y -= combinedM / a.mass;
                a.velocity.y -= collision.velocity.y;
            }
            if (!b.static) {
                b.position.y -= Math.round(depth.y);
                //b.velocity.y += combinedM / b.mass;
                b.velocity.y += collision.velocity.y
            }

        }

        // const posTranslate = Vector.multiply(Vector.sign(a.velocity), 2);
        // a.position = Vector.sum(a.position, posTranslate.negative());

    }

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

function areCollidingRaw(a: Entity, bs: Entity[]): boolean {
    let colliding = false;

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

function getCollisionBetweenRaw(a: Entity, b: Entity): Collision | null {
    if (!areCollidingRaw(a, [b])) return null;

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

export { Collision, getCollisions, handleCollisions, getCollisionsBetween }