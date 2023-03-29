import Entity from "../Entity";
import global from "./global";
import { EntityGroup, PhysicsObject } from "./types";

export function getById(id: number): PhysicsObject {
    const entities: PhysicsObject[] = global.entities;

    return entities.filter((o) => o.id === id)[0];
}

export function nextID(): number {
    const entities: PhysicsObject[] = global.entities;
    return entities.length;
}

export function getByGroup(group: EntityGroup): PhysicsObject[] {
    const entities: PhysicsObject[] = global.entities;

    return entities.filter((o) => o.group === group);
}

