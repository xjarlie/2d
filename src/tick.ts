import Entity from "./Entity";
import global from "./global";
import { milliseconds } from "./lib/types";

let ticks: number = 0;

let lastTimestamp: number = 0;
global.tps = 0;

function tick(timestamp: DOMHighResTimeStamp) {

    const deltaTime: milliseconds = timestamp - lastTimestamp;
    global.tps = 1 / (deltaTime / 1000)
    

    global.ctx.clearRect(0, 0, global.ctx.canvas.width, global.ctx.canvas.height);


    const entities: Entity[] = global.entities;

    for (const i in entities) {
        entities[i].tick(deltaTime);
        entities[i].draw();
    }

    lastTimestamp = timestamp;

    ticks++;
    requestAnimationFrame(tick);

}

export { ticks, tick };