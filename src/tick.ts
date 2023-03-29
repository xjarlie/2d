import { reset } from ".";
import Camera from "./Camera";
import Entity from "./Entity";
import { handleCollisions } from "./lib/collisions";
import global from "./lib/global";
import { keyPressed } from "./lib/keyMap";
import { milliseconds } from "./lib/types";
import { Vector } from "./Vector";

let ticks: number = 0;
let paused: boolean = false;

let lastTimestamp: number = 0;
global.tps = 0;

let lastReset: number = Date.now();

function tick(timestamp: DOMHighResTimeStamp) {

    if (paused) return;

    const deltaTime: milliseconds = timestamp - lastTimestamp;
    global.tps = 1 / (deltaTime / 1000);

    const camera: Camera = global.camera;

    //console.info('TPS: ', global.tps);
    
    // move camera - Doesn't really work - prob need custom class
    if (keyPressed("ArrowLeft")) {
        camera.translate(-10, 0);
    }

    if (keyPressed("ArrowRight")) {
        camera.translate(10, 0)
    }

    if (keyPressed("ArrowUp")) {
        camera.translate(0, -10);
    }

    if (keyPressed("ArrowDown")) {
        camera.translate(0, 10);
    }

    if (keyPressed("f")) {
        if (Date.now() > lastReset + 1000) {
            lastReset = Date.now();
            reset();
        }
    }


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

        // Get screenspace position of entity
        camera.render(o);
    }

    lastTimestamp = timestamp;

    ticks++;
    requestAnimationFrame(tick);

}

function pause() {
    paused = true;
}

function unpause() {
    paused = false;
}

function setTicks(newTicks: number) {
    ticks = newTicks;
}

export { ticks, tick, setTicks, pause, unpause };