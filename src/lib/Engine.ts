import Entity from "./Entity";
import { nextID } from "./getEntities";
import { CameraModule, PhysicsModule }  from "./types";


class Engine {
    physicsModule: PhysicsModule;
    camera: CameraModule;

    entities: Entity[];

    constructor() {

    }

    render(item: Entity): void {
        this.camera.render(item);
    }

    renderAll(): void {
        for (const i in this.entities) {
            this.camera.render(this.entities[i]);
        }
    }

    add(item: Entity) {
        item.id = nextID();
        this.entities.push(item);
    }

    start() {
        requestAnimationFrame(this.tick);
    }

    tick: (deltaTime: DOMHighResTimeStamp) => void
}

export default Engine;