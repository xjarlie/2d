import Entity from "./Entity";
import { Vector } from "./Vector";
import { Collision } from "./collisions";
import { CollisionType } from "./types";

class Bounds {
    center: Vector;
    vertices: Vector[];
    size: Vector;
    halfSize: Vector;
    parent: Entity;

    constructor(parent: Entity, topLeft: Vector, topRight: Vector, bottomRight: Vector, bottomLeft: Vector) {
        this.parent = parent;

        this.vertices = [topLeft, topRight, bottomRight, bottomLeft];
        this.size = new Vector(topRight.x - topLeft.x, bottomLeft.y - topLeft.y);
        this.halfSize = Vector.divide(this.size, 2);

        this.center = Vector.sum(this.vertices[0], this.halfSize);
    }

    updatePosition(center: Vector) {
        const diff = Vector.subtract(center, this.center);

        for (const i in this.vertices) {
            this.vertices[i] = Vector.sum(this.vertices[i], diff);
        }

        this.center = center;
    }

    isCollidingWith(b: Bounds): boolean {
        const a = this;

        const [aTopLeft, aTopRight, aBottomRight, aBottomLeft] = a.vertices;
        const [bTopLeft, bTopRight, bBottomRight, bBottomLeft] = b.vertices;

        const isColliding = !(
            (aBottomLeft.y < bTopLeft.y) ||
            (aTopLeft.y > bBottomLeft.y) ||
            (aTopRight.x < bTopLeft.x) ||
            aTopLeft.x > bTopRight.x
        );

        return isColliding;
    }

    getCollisionWith(b: Bounds, needsCheck: boolean): Collision {
        const a = this;
        if (needsCheck && !this.isCollidingWith(b)) return null;

        const collision = new Collision(a.parent, b.parent);

        // Get collision depth vector
        const pDiff = Vector.subtract(a.center, b.center);
        const minDiff = Vector.sum(a.halfSize, b.halfSize);
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

        return collision;
    }


}

export default Bounds;