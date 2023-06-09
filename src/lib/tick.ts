import { engine, reset } from "..";
import Camera from "../modules/Camera";
import Entity from "./Entity";
import { Collision, getAllCollisions, updateCollisions } from "./collisions";
import global from "./global";
import { keyPressed } from "./keyMap";
import { milliseconds } from "./types";
import { Vector } from "./Vector";
import DefaultPhysics from "../modules/DefaultPhysics";

let ticks: number = 0;
let paused: boolean = false;
let justUnpaused: boolean = false;

let lastTimestamp: number = 0;
global.tps = 0;

let lastReset: number = Date.now();

let savedCollisions: Collision[] = [];

function tick(timestamp: DOMHighResTimeStamp) {

    if (paused) {
        global.handlerNum = requestAnimationFrame(tick);
        return
    }

    const deltaTime: milliseconds = justUnpaused ? 16.67 : timestamp - lastTimestamp;
    justUnpaused = false;

    global.tps = 1 / (deltaTime / 1000);

    const camera = engine.camera as Camera;

    //console.info('TPS: ', global.tps);

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

    const entities: Entity[] = [...engine.entities];
    const physics = engine.physicsModule as DefaultPhysics;

    const onScreen: number[] = [];

    for (const o of entities) {

        const lowerX = camera.position.x - 0.5 * camera.ctx.canvas.width - o.size.x;
        const upperX = camera.position.x + 2.5 * camera.ctx.canvas.width + o.size.x;
        const lowerY = camera.position.y - 0.5 * camera.ctx.canvas.height - o.size.y;
        const upperY = camera.position.y + 2.5 * camera.ctx.canvas.height + o.size.y;

        // optimisation
        if (!((o.position.x > lowerX && o.position.x < upperX) && (o.position.y > lowerY && o.position.y < upperY))) {
            continue;
        } else {
            onScreen.push(o.id);
        }

        if (ticks > 5) {
            physics.applyPhysics(o);
            o.tick(deltaTime);
        };
    }

    updateCollisions();
    physics.handleCollisions(getAllCollisions());

    camera.tick(); 
    engine.camera.ctx.clearRect(0, 0, engine.camera.ctx.canvas.width, engine.camera.ctx.canvas.height);
    for (const o of entities) {
        o.force = new Vector();
        o.acceleration = new Vector();

        if (!onScreen.includes(o.id)) {
            continue;
        }

        // Get screenspace position of entity
        camera.render(o);
    }

    lastTimestamp = timestamp;
    ticks++;
    global.handlerNum = requestAnimationFrame(tick);
    console.log('current', global.handlerNum);
}

function pause() {
    paused = true;
    // savedCollisions = getAllCollisions();

    console.log('paused', ticks);
}

function unpause() {
    // resetCollisions();
    // setCollisions(savedCollisions);
    // console.log(getAllCollisions());
    paused = false;
    justUnpaused = true;
    console.log('unpaused', ticks);
}

function setTicks(newTicks: number) {
    ticks = newTicks;
}

export { ticks, tick, setTicks, pause, unpause };