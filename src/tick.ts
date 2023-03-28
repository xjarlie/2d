import Entity from "./Entity";
import { handleCollisions } from "./lib/collisions";
import global from "./lib/global";
import { milliseconds } from "./lib/types";
import { Vector } from "./Vector";

let ticks: number = 0;

let lastTimestamp: number = 0;
global.tps = 0;

function tick(timestamp: DOMHighResTimeStamp) {

    const deltaTime: milliseconds = timestamp - lastTimestamp;
    global.tps = 1 / (deltaTime / 1000);

    //console.info('TPS: ', global.tps);
    



    const entities: Entity[] = [...global.entities];
    //console.log('TICK RUNNING', ticks);

    

    for (const o of entities) {
        if (ticks > 5) o.tick(deltaTime);
    }

    handleCollisions();

    global.ctx.clearRect(0, 0, global.ctx.canvas.width, global.ctx.canvas.height);
    for (const o of entities) {
        o.force = new Vector();
        o.acceleration = new Vector();
        o.draw();
    }

    lastTimestamp = timestamp;

    ticks++;
    requestAnimationFrame(tick);

}

export { ticks, tick };