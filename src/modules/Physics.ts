import Entity from "../lib/Entity";
import { Vector } from "../lib/Vector";
import { Collision, getCollisions } from "../lib/collisions";
import { getById } from "../lib/getEntities";
import { CollisionType } from "../lib/types";

class PhysicsEngine {

    gravity: number;
    airConstant: number;

    constructor(options: { gravity: number, airConstant: number }) {
        this.gravity = options.gravity;
        this.airConstant = options.airConstant;
    }

    handleCollisions(collisions: Collision[]) {
        // Handle collision physics

        for (const collision of collisions) {

            const a = getById(collision.bodyA.id);
            const b = getById(collision.bodyB.id);

            const totalMass = a.mass + b.mass;
            const massAMinusBOverTotal = (a.mass - b.mass) / totalMass;
            const massBMinusAOverTotal = (b.mass - a.mass) / totalMass;
            const massATimes2OverTotal = (2 * a.mass) / totalMass;
            const massBTimes2OverTotal = (2 * b.mass) / totalMass;

            const depth = collision.depth;

            if (Math.abs(depth.x) < Math.abs(depth.y)) {
                // Collision along X axis

                const v1 = (a.velocity.x * massAMinusBOverTotal) + (b.velocity.x * massBTimes2OverTotal);
                const v2 = (b.velocity.x * massBMinusAOverTotal) + (a.velocity.x * massATimes2OverTotal);


                if (!a.static) a.velocity.x = v1;
                if (!b.static) b.velocity.x = v2;

                if (!a.static) a.position.x += depth.x;
                if (!b.static) b.position.x -= depth.x;

            } else {
                // Collision along Y axis

                const v1 = (a.velocity.y * massAMinusBOverTotal) + (b.velocity.y * massBTimes2OverTotal);
                const v2 = (b.velocity.y * massBMinusAOverTotal) + (a.velocity.y * massATimes2OverTotal);

                if (!a.static) a.velocity.y = v1;
                if (!b.static) b.velocity.y = v2;

                if (!a.static) a.position.y += depth.y;
                if (!b.static) b.position.y -= depth.y;

            }
        }
    }

    applyPhysics(entity: Entity) {
        if (entity.hasGravity) entity.applyForce(new Vector(0, this.gravity * entity.mass));

        // apply air resistance
        const airRes = new Vector(0, 0);
        airRes.x = -0.5 * this.airConstant * (entity.size.y / 1) * Math.pow(entity.velocity.x, 2) * Math.sign(entity.velocity.x);
        airRes.y = -0.5 * this.airConstant * (entity.size.x / 1) * Math.pow(entity.velocity.y, 2) * Math.sign(entity.velocity.y);
        // entity.force = Vector.sum(entity.force, airRes);


        // apply friction
        const allCollisions = getCollisions(entity);
        const friction = new Vector(0, 0);
        // F = mR
        for (const o of allCollisions) {
            const aFriction = o.bodyA.friction;
            const bFriction = o.bodyB.friction;

            const avgFriction = (aFriction + bFriction) / 2;


            if (o.type === CollisionType.Bottom || o.type === CollisionType.Top) {

                const fFriction = Math.round(entity.force.y) * avgFriction;

                if (Math.abs(fFriction) > Math.abs(entity.force.x)) {
                    // entity.velocity.x = 0;
                    entity.velocity.x *= 1 - avgFriction;
                } else {
                    if (Math.abs(Math.round(entity.velocity.x)) > 0) friction.x -= fFriction;
                }

            } else {

                const fFriction = Math.round(entity.force.x) * avgFriction;

                if (Math.abs(fFriction) > Math.abs(entity.force.y)) {
                    // entity.velocity.y = 0;
                    entity.velocity.y *= 1 - avgFriction;
                    if (Math.abs(Math.round(entity.velocity.y)) > 0) friction.y -= entity.force.y;
                    // if (Math.abs(Math.round(entity.velocity.y)) > 0) friction.y -= fFriction;
                } else {
                    if (Math.abs(Math.round(entity.velocity.y)) > 0) friction.y -= fFriction;
                }
            }



            //console.log(entity, avgFriction, friction);
        }

        entity.applyForce(airRes);
        entity.applyForce(friction);
    }
}

export default PhysicsEngine;