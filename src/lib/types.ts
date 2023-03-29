import { Vector } from "../Vector"

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

export interface Renderable {
    position: Vector;
    draw: Function;
}