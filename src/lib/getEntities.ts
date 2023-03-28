import Entity from "../Entity";
import global from "./global";
import { EntityGroup } from "./types";

export function getById(id: string): Entity {
    const entities: Entity[] = global.entities;

    return entities.filter((o) => o.id === id)[0];
}

export function getByGroup(group: EntityGroup): Entity[] {
    const entities: Entity[] = global.entities;

    return entities.filter((o) => o.group === group);
}