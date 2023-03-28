import Entity from "../Entity";
import { Vector } from "../Vector";
import global from "./global";

const collisions = [];

function handleCollisions() {
    
}

function getCollisions() {

}

class Collision {
    vector: Vector;
    bodyA: Entity;
    bodyB: Entity;

    constructor(a: Entity, b: Entity, x: number, y: number) {
        this.bodyA = a;
        this.bodyB = b;
        this.vector = new Vector(x, y);
    }
}

export { Collision, getCollisions }