import { engine } from "..";
import Entity from "./Entity";
import { EntityGroup } from "./types";

export function getById(id: number): Entity {
    const entities: Entity[] = engine.entities;

    return entities.filter((o) => o.id === id)[0];
}

export function nextID(): number {
    const entities: Entity[] = engine.entities;
    return entities.length;
}

export function getByGroup(...groups: EntityGroup[]): Entity[] {
    const entities: Entity[] = engine.entities;

    return entities.filter((o) => groups.some(i => o.groups.includes(i)));
}