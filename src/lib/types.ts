import Entity from "../Entity";
import { Vector } from "../Vector"
import { Collision } from "./collisions";

export type seconds = number
export type milliseconds = number

export enum EntityGroup {
    Default,
    Ground,
    Player,
    Box
}

export enum CollisionType {
    Top,
    Right,
    Bottom,
    Left
}

export interface PhysicsObject {
    position: Vector;
    draw: (position: Vector) => void;
    tick: (deltaTime: DOMHighResTimeStamp) => void;
    id: number;
    group: EntityGroup;
    velocity: Vector;
    mass: number;
    static: boolean;
    getCollisionWith: (b: PhysicsObject) => Collision
    isCollidingWith: (bs: PhysicsObject[]) => boolean;
}