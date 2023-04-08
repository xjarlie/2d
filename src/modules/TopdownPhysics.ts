import Entity from "../lib/Entity";
import { Vector } from "../lib/Vector";
import { Collision } from "../lib/collisions";
import { getById } from "../lib/getEntities";
import { PhysicsModule } from "../lib/types";

class TopdownPhysics implements PhysicsModule {

    airConstant: number;

    constructor(options: { airConstant: number }) {
        this.airConstant = options.airConstant;
    }

    handleCollisions(collisions: Collision[]) {
        for (const collision of collisions) {

            const a = getById(collision.bodyA.id);
            const b = getById(collision.bodyB.id);

            if (a.static && b.static) continue;

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
        // apply air resistance
        // const airRes = new Vector(0, 0);
        // airRes.x = -0.5 * this.airConstant * (entity.size.y / 1) * Math.pow(entity.velocity.x, 2) * Math.sign(entity.velocity.x);
        // airRes.y = -0.5 * this.airConstant * (entity.size.x / 1) * Math.pow(entity.velocity.y, 2) * Math.sign(entity.velocity.y);

        // entity.applyForce(airRes);
    }
}

export default TopdownPhysics;