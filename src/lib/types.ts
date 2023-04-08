import Entity from "./Entity"
import { Vector } from "./Vector";

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

export interface PhysicsModule {
    
}

export interface CameraModule {
    render: (entity: Entity) => void;
    tick: () => void;
    setCenter: (center: Vector) => void;
    ctx: CanvasRenderingContext2D;
}