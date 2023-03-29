import Entity from "./Entity";
import { nextID } from "./lib/getEntities";
import { Renderable } from "./lib/types";
import { Vector } from "./Vector";

class Composite implements Renderable {
    cPos: Vector;

    id: number;
    
    entities: Entity[];
    
    constructor(posX: number = 0, posY: number = 0, entities: Entity[]) {

        this.cPos = new Vector(posX, posY);

        this.entities = entities;
    }

    set position(position: Vector) {
        this.cPos = position;


    }

    draw() {
        this.entities
    }

    add() {
        this.id = nextID();
        

        for (const o of this.entities) {
            o.add();
        }
    }

}

export default Composite;